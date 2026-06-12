// ═══════════════════════════════════════════════════════════════
// JENKINSFILE - Pipeline CI/CD untuk Pilates Automation Tests
// ═══════════════════════════════════════════════════════════════
//
// File ini HARUS ditaruh di ROOT folder project automation-tests kamu.
// Lokasi: automation-tests/Jenkinsfile (sejajar dengan package.json)
//
// Struktur folder kamu setelah perbaikan:
//
//   automation-tests/
//   ├── Jenkinsfile              ← FILE INI
//   ├── package.json
//   ├── package-lock.json
//   ├── playwright.config.ts
//   ├── .env.example
//   ├── .gitignore
//   ├── tsconfig.json
//   ├── tests/
//   │   ├── api/
//   │   │   ├── auth/positive/login.spec.ts
//   │   │   ├── auth/positive/register.spec.ts
//   │   │   └── admin/positive/packages.spec.ts
//   │   └── ui/
//   │       ├── customer/auth/positive/login.spec.ts
//   │       ├── customer/auth/positive/register.spec.ts
//   │       └── admin/master-data/...
//   ├── api/
//   ├── ui/
//   ├── shared/
//   └── services/
//
// ═══════════════════════════════════════════════════════════════

pipeline {

    // "agent any" = jalankan di Jenkins node manapun yang tersedia
    // Karena kamu cuma punya 1 Jenkins (di Docker), ini otomatis jalan di situ
    agent any

    // ─── PARAMETER ──────────────────────────────────────────────
    // Ini muncul sebagai form yang bisa kamu isi saat klik "Build with Parameters"
    // di Jenkins UI. Setiap kali mau jalankan pipeline, kamu bisa ubah nilainya.
    parameters {
        string(
            name: 'BASE_URL',
            defaultValue: 'https://manhunt-snowflake-winnings.ngrok-free.dev/',
            description: 'Ngrok URL dari app Pilates kamu (copy dari terminal Ngrok)'
        )
        choice(
            name: 'TEST_SCOPE',
            choices: ['smoke-only', 'full-regression'],
            description: 'smoke-only = cepat (login + auth saja). full-regression = semua test.'
        )
    }

    // ─── TOOLS ──────────────────────────────────────────────────
    // Ini referensi ke tools yang sudah kamu setup di Jenkins > Manage Jenkins > Tools
    // Nama harus PERSIS sama dengan yang kamu tulis saat konfigurasi
    tools {
        nodejs 'nodejs-20'    // Nama NodeJS installation di Jenkins
        allure 'allure'       // Nama Allure installation di Jenkins
    }

    // ─── ENVIRONMENT VARIABLES ──────────────────────────────────
    // Variabel ini tersedia di SEMUA stage di bawah.
    // Test kamu membaca BASE_URL, ADMIN_EMAIL, dll dari process.env
    // Jadi kita set di sini supaya Playwright bisa baca.
    environment {
        BASE_URL            = "${params.BASE_URL}"
        API_BASE_URL        = "${params.BASE_URL}/api"
        CI                  = 'true'
        ADMIN_EMAIL         = 'admin@pilates.com'
        ADMIN_PASSWORD      = 'admin123'
        CUSTOMER_EMAIL      = 'customer@test.com'
        CUSTOMER_PASSWORD   = 'password'
        INSTRUCTOR_EMAIL    = 'jono@femm.com'
        INSTRUCTOR_PASSWORD = 'password'
    }

    // ─── STAGES ─────────────────────────────────────────────────
    // Ini urutan eksekusi pipeline. Jalan satu per satu dari atas ke bawah.
    // Kalau satu stage GAGAL, stage berikutnya TIDAK akan jalan (kecuali post).
    stages {

        // ═══════════════════════════════════════
        // STAGE 1: CHECKOUT
        // ═══════════════════════════════════════
        // Jenkins download/clone repo automation-tests dari GitHub ke workspace-nya.
        // cleanWs() = bersihkan sisa-sisa build sebelumnya supaya mulai fresh.
        stage('Checkout') {
            steps {
        echo "✅ Code sudah di-checkout otomatis dari SCM"
        echo "📁 Working directory: ${env.WORKSPACE}"
    }
        }

        // ═══════════════════════════════════════
        // STAGE 2: INSTALL DEPENDENCIES
        // ═══════════════════════════════════════
        // npm ci = install package dari package-lock.json (lebih cepat & konsisten dari npm install)
        // playwright install chromium = download browser Chromium ke dalam Jenkins container
        // --with-deps = install juga system library yang dibutuhkan Chromium di Linux
        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "📦 Installing npm packages..."
                    npm ci

                    echo "🌐 Installing Playwright Chromium..."
                    npx playwright install chromium
                '''
            }
        }

        // ═══════════════════════════════════════
        // STAGE 3: HEALTH CHECK
        // ═══════════════════════════════════════
        // Sebelum jalankan test apapun, cek dulu apakah app kamu hidup.
        // Ini penting karena kalau Ngrok mati atau app belum start,
        // semua test pasti gagal dan buang waktu.
        //
        // curl = kirim HTTP request, ambil status code-nya
        // Retry 5 kali dengan jeda 5 detik
        stage('Health Check') {
            steps {
                sh '''
                    echo "🏥 Checking if app is alive at ${BASE_URL}..."
                    
                    for i in 1 2 3 4 5; do
                        HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' \
                            -H 'ngrok-skip-browser-warning: true' \
                            "${BASE_URL}" || echo "000")
                        
                        if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
                            echo "✅ App is alive! (HTTP $HTTP_CODE)"
                            exit 0
                        fi
                        
                        echo "⏳ Attempt $i/5 - Got HTTP $HTTP_CODE, retrying in 5s..."
                        sleep 5
                    done
                    
                    echo "❌ App is NOT responding at ${BASE_URL}"
                    echo ""
                    echo "Checklist:"
                    echo "  1. App kamu sudah jalan di local? (php artisan serve)"
                    echo "  2. Ngrok aktif? (ngrok http 8000)"
                    echo "  3. URL yang dimasukkan benar?"
                    exit 1
                '''
            }
        }

        // ═══════════════════════════════════════
        // STAGE 4: API SMOKE TEST
        // ═══════════════════════════════════════
        // Smoke test = test ringan dan cepat.
        // Cek: apakah login bisa? apakah register bisa? apakah API respond?
        //
        // Yang dijalankan: tests/api/auth/**/*.spec.ts
        // (login.spec.ts + register.spec.ts)
        //
        // Ini SELALU jalan, baik smoke-only maupun full-regression.
        stage('API Smoke Test') {
            steps {
                sh '''
                    echo "🔥 Running API Smoke Tests..."
                    npx playwright test --project=api-smoke
                '''
            }
        }

        // ═══════════════════════════════════════
        // STAGE 5: API REGRESSION TEST
        // ═══════════════════════════════════════
        // Regression = test SEMUA endpoint API yang ada.
        // Termasuk: auth + admin packages CRUD + dll.
        //
        // Yang dijalankan: tests/api/**/*.spec.ts (semua file di folder api)
        //
        // when { expression } = HANYA jalan kalau TEST_SCOPE = full-regression
        // Kalau smoke-only, stage ini di-SKIP.
        stage('API Regression Test') {
            when {
                expression { params.TEST_SCOPE == 'full-regression' }
            }
            steps {
                sh '''
                    echo "🧪 Running API Regression Tests..."
                    npx playwright test --project=api-regression
                '''
            }
        }

        // ═══════════════════════════════════════
        // STAGE 6: UI SMOKE TEST
        // ═══════════════════════════════════════
        // Test UI ringan: buka halaman login customer, coba login.
        //
        // Yang dijalankan: tests/ui/customer/auth/**/*.spec.ts
        //
        // SELALU jalan.
        stage('UI Smoke Test') {
            steps {
                sh '''
                    echo "🖥️ Running UI Smoke Tests..."
                    npx playwright test --project=ui-smoke
                '''
            }
        }

        // ═══════════════════════════════════════
        // STAGE 7: UI REGRESSION TEST
        // ═══════════════════════════════════════
        // Test UI lengkap: semua halaman, semua flow.
        // Login admin, create package, list kelas, dll.
        //
        // Yang dijalankan: tests/ui/**/*.spec.ts (semua file di folder ui)
        //
        // HANYA jalan kalau full-regression.
        stage('UI Regression Test') {
            when {
                expression { params.TEST_SCOPE == 'full-regression' }
            }
            steps {
                sh '''
                    echo "🖥️ Running UI Regression Tests..."
                    npx playwright test --project=ui-regression
                '''
            }
        }

        // ═══════════════════════════════════════
        // STAGE 8: APPROVAL GATE
        // ═══════════════════════════════════════
        // Pipeline BERHENTI di sini.
        // Kamu harus buka Jenkins, lihat Allure Report,
        // lalu klik tombol "Approve & Deploy" untuk lanjut.
        //
        // Kalau kamu klik "Abort", pipeline berhenti dan deploy TIDAK terjadi.
        //
        // Di Jenkins UI, kamu akan lihat:
        //   ┌──────────────────────────────────────┐
        //   │  Semua test selesai.                  │
        //   │  Deploy ke Production?                │
        //   │                                       │
        //   │  [Approve & Deploy]    [Abort]        │
        //   └──────────────────────────────────────┘
        stage('Approval Gate') {
            steps {
                echo '══════════════════════════════════════════════'
                echo '📊 Semua test sudah selesai.'
                echo '   Review Allure Report sebelum approve.'
                echo '══════════════════════════════════════════════'

                input message: 'Deploy ke Production?',
                      ok: 'Approve & Deploy'
            }
        }

        // ═══════════════════════════════════════
        // STAGE 9: DEPLOY PRODUCTION
        // ═══════════════════════════════════════
        // Ini jalan HANYA setelah kamu klik Approve.
        //
        // Untuk sekarang ini simulasi (echo saja).
        // Nanti kalau kamu punya server, ganti dengan:
        //   - ssh ke server + git pull + restart
        //   - atau trigger GitHub Actions
        //   - atau docker pull + docker restart
        stage('Deploy Production') {
            steps {
                sh '''
                    echo "═══════════════════════════════════════"
                    echo "🚀 PRODUCTION DEPLOY TRIGGERED"
                    echo "   Timestamp: $(date)"
                    echo "   Target: ${BASE_URL}"
                    echo "═══════════════════════════════════════"
                '''
                // Contoh kalau nanti punya server:
                // sh 'ssh deploy@server "cd /var/www/pilates && git pull && php artisan migrate --force"'
            }
        }

        // ═══════════════════════════════════════
        // STAGE 10: POST-DEPLOY SANITY CHECK
        // ═══════════════════════════════════════
        // Setelah deploy, jalankan smoke test LAGI untuk verifikasi
        // production masih bisa jalan normal setelah di-deploy.
        stage('Post-Deploy Sanity') {
            steps {
                sh '''
                    echo "🔍 Running post-deploy sanity check..."
                    npx playwright test --project=api-smoke
                '''
            }
        }
    }

    // ─── POST ACTIONS ───────────────────────────────────────────
    // Block ini SELALU jalan, mau pipeline sukses atau gagal.
    // Gunanya: generate Allure Report dan simpan artifacts.
    post {
        always {
            // Generate Allure Report dari folder allure-results/
            // Report bisa dilihat di Jenkins > job > Build > Allure Report
            allure includeProperties: false,
                   results: [[path: 'allure-results']]

            // Simpan screenshot, video, trace dari test yang gagal
            // Bisa di-download dari Jenkins > job > Build > Artifacts
            archiveArtifacts artifacts: 'reports/**/*',
                             allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*',
                             allowEmptyArchive: true
        }
        success {
            echo '''
            ╔══════════════════════════════════════╗
            ║   ✅ PIPELINE SUKSES                 ║
            ╚══════════════════════════════════════╝
            '''
        }
        failure {
            echo '''
            ╔══════════════════════════════════════╗
            ║   ❌ PIPELINE GAGAL                  ║
            ║   Cek Allure Report untuk detail     ║
            ╚══════════════════════════════════════╝
            '''
        }
    }
}
