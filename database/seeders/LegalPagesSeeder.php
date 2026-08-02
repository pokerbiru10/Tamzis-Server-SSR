<?php

namespace Database\Seeders;

use App\Models\SiteSection;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LegalPagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SiteSection::updateOrCreate(
            ['key' => 'kebijakan-privasi'],
            ['data' => [
                'id' => [
                    ['title' => '1. Informasi yang Kami Kumpulkan', 'body' => '<p>Kami mengumpulkan informasi pribadi yang Anda berikan secara langsung, seperti nama lengkap, alamat email, nomor telepon, dan informasi lain yang dikirimkan melalui formulir di website ini (misalnya simulasi pembiayaan, simulasi simpanan, dan lamaran kerja).</p>'],
                    ['title' => '2. Bagaimana Kami Menggunakan Informasi Anda', 'body' => '<p>Informasi yang dikumpulkan digunakan untuk memproses permintaan Anda, memberikan layanan simulasi pembiayaan/simpanan, menanggapi pertanyaan, serta meningkatkan produk dan layanan kami. Kami tidak menjual data pribadi Anda kepada pihak ketiga.</p>'],
                    ['title' => '3. Penyimpanan dan Keamanan Data', 'body' => '<p>Kami menerapkan langkah-langkah pengamanan administratif, teknis, dan fisik yang wajar untuk melindungi informasi pribadi Anda dari akses, perubahan, pengungkapan, atau perusakan yang tidak sah.</p>'],
                    ['title' => '4. Pembagian Informasi', 'body' => '<p>Kami dapat membagikan informasi Anda kepada kantor cabang TAMZIS yang berwenang untuk keperluan menindaklanjuti permintaan pembiayaan atau simpanan Anda. Kami tidak membagikan data Anda kepada pihak ketiga yang tidak terkait tanpa persetujuan Anda, kecuali diwajibkan oleh hukum.</p>'],
                    ['title' => '5. Cookies', 'body' => '<p>Website ini dapat menggunakan cookies untuk meningkatkan pengalaman berselancar Anda. Anda dapat menonaktifkan cookies melalui pengaturan browser, meskipun beberapa fitur mungkin tidak berfungsi dengan baik akibatnya.</p>'],
                    ['title' => '6. Hak Anda', 'body' => '<p>Anda berhak untuk mengakses, memperbaiki, atau meminta penghapusan data pribadi Anda yang kami simpan. Silakan hubungi Contact Center kami untuk menggunakan hak-hak tersebut.</p>'],
                    ['title' => '7. Perubahan Kebijakan Ini', 'body' => '<p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diumumkan di halaman ini beserta tanggal revisi terbaru.</p>'],
                    ['title' => '8. Hubungi Kami', 'body' => '<p>Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami melalui info@tamzis.id atau kanal Contact Center resmi kami.</p>'],
                ],
                'en' => [
                    ['title' => '1. Information We Collect', 'body' => '<p>We collect personal information you provide directly to us, such as your full name, email address, phone number, and other information submitted through forms on this website (e.g. financing simulations, savings simulations, and job applications).</p>'],
                    ['title' => '2. How We Use Your Information', 'body' => '<p>Information collected is used to process your requests, provide financing/savings simulation services, respond to inquiries, and improve our products and services. We do not sell your personal data to third parties.</p>'],
                    ['title' => '3. Data Storage and Security', 'body' => '<p>We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>'],
                    ['title' => '4. Sharing of Information', 'body' => '<p>We may share your information with authorized TAMZIS branch offices for the purpose of following up on your financing or savings inquiry. We do not share your data with unrelated third parties without your consent, except where required by law.</p>'],
                    ['title' => '5. Cookies', 'body' => '<p>This website may use cookies to improve your browsing experience. You may disable cookies through your browser settings, though some features may not function properly as a result.</p>'],
                    ['title' => '6. Your Rights', 'body' => '<p>You have the right to access, correct, or request deletion of your personal data held by us. Please contact our Contact Center to exercise these rights.</p>'],
                    ['title' => '7. Changes to This Policy', 'body' => '<p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>'],
                    ['title' => '8. Contact Us', 'body' => '<p>If you have questions about this Privacy Policy, please contact us at info@tamzis.id or through our official Contact Center channels.</p>'],
                ],
            ]],
        );

        SiteSection::updateOrCreate(
            ['key' => 'syarat-ketentuan'],
            ['data' => [
                'id' => [
                    ['title' => '1. Penerimaan Ketentuan', 'body' => '<p>Dengan mengakses dan menggunakan website ini, Anda setuju untuk terikat dengan Syarat & Ketentuan ini. Jika Anda tidak setuju, mohon untuk tidak melanjutkan penggunaan website ini.</p>'],
                    ['title' => '2. Sifat Hasil Simulasi', 'body' => '<p>Seluruh hasil simulasi pembiayaan dan simpanan yang ditampilkan di website ini (termasuk simulasi GTB, Mudharabah, dan Murabahah) bersifat estimasi indikatif. Angka final akan disesuaikan melalui verifikasi, ketentuan akad, dan kebijakan kantor cabang TAMZIS yang bersangkutan.</p>'],
                    ['title' => '3. Tidak Ada Jaminan Persetujuan', 'body' => '<p>Pengiriman formulir simulasi atau data diri bukan merupakan pengajuan pembiayaan atau simpanan, dan tidak menjamin persetujuan. Pengajuan resmi akan melalui proses penilaian dan persetujuan tersendiri oleh TAMZIS.</p>'],
                    ['title' => '4. Tanggung Jawab Pengguna', 'body' => '<p>Anda bertanggung jawab untuk memberikan informasi yang akurat dan benar saat menggunakan formulir di website ini. TAMZIS tidak bertanggung jawab atas kerugian yang timbul akibat informasi yang tidak akurat dari pengguna.</p>'],
                    ['title' => '5. Hak Kekayaan Intelektual', 'body' => '<p>Seluruh konten di website ini, termasuk teks, logo, gambar, dan desain, adalah milik TAMZIS Bina Utama dan dilindungi oleh hukum kekayaan intelektual yang berlaku. Penggandaan tanpa izin tertulis dilarang.</p>'],
                    ['title' => '6. Batasan Tanggung Jawab', 'body' => '<p>TAMZIS tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan, atau ketidakmampuan menggunakan, website ini, termasuk namun tidak terbatas pada kesalahan teknis, gangguan layanan, atau ketidakakuratan informasi yang ditampilkan.</p>'],
                    ['title' => '7. Kepatuhan Syariah', 'body' => '<p>Seluruh produk pembiayaan dan simpanan yang dirujuk di website ini disusun sesuai prinsip syariah dan tunduk pada fatwa Dewan Syariah Nasional (DSN-MUI) yang berlaku.</p>'],
                    ['title' => '8. Perubahan Ketentuan', 'body' => '<p>TAMZIS berhak mengubah Syarat & Ketentuan ini sewaktu-waktu. Penggunaan berkelanjutan atas website ini setelah perubahan diumumkan dianggap sebagai persetujuan atas ketentuan yang telah direvisi.</p>'],
                    ['title' => '9. Hubungi Kami', 'body' => '<p>Untuk pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi kami melalui info@tamzis.id atau kanal Contact Center resmi kami.</p>'],
                ],
                'en' => [
                    ['title' => '1. Acceptance of Terms', 'body' => '<p>By accessing and using this website, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of this website.</p>'],
                    ['title' => '2. Nature of Simulation Results', 'body' => '<p>All financing and savings simulation results displayed on this website (including GTB, Mudharabah, and Murabahah simulations) are indicative estimates only. Final figures are subject to verification, contract terms, and the applicable policies of the relevant TAMZIS branch office.</p>'],
                    ['title' => '3. No Guarantee of Approval', 'body' => '<p>Submitting a simulation or personal data form does not constitute an application for financing or savings, nor does it guarantee approval. Formal applications are subject to a separate assessment and approval process by TAMZIS.</p>'],
                    ['title' => '4. User Responsibilities', 'body' => '<p>You are responsible for providing accurate and truthful information when using forms on this website. TAMZIS is not liable for losses arising from inaccurate information provided by users.</p>'],
                    ['title' => '5. Intellectual Property', 'body' => '<p>All content on this website, including text, logos, images, and design, is the property of TAMZIS Bina Utama and is protected by applicable intellectual property laws. Reproduction without written permission is prohibited.</p>'],
                    ['title' => '6. Limitation of Liability', 'body' => '<p>TAMZIS is not liable for any direct or indirect losses arising from the use of, or inability to use, this website, including but not limited to technical errors, service interruptions, or inaccuracies in displayed information.</p>'],
                    ['title' => '7. Sharia Compliance', 'body' => '<p>All financing and savings products referenced on this website are structured in accordance with sharia principles and are subject to the applicable fatwa of the National Sharia Board (DSN-MUI).</p>'],
                    ['title' => '8. Changes to Terms', 'body' => '<p>TAMZIS reserves the right to modify these Terms & Conditions at any time. Continued use of this website after changes are posted constitutes acceptance of the revised terms.</p>'],
                    ['title' => '9. Contact Us', 'body' => '<p>For questions regarding these Terms & Conditions, please contact us at info@tamzis.id or through our official Contact Center channels.</p>'],
                ],
            ]],
        );
    }
}
