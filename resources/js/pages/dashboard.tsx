import { Head, usePage } from '@inertiajs/react';
import { Users, Calculator, Activity, Newspaper, Briefcase, Eye, CalendarDays } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatCurrencyIDR } from '@/lib/utils';
import { dashboard } from '@/routes';

interface SimulasiSimpanan {
    id: number;
    nama_lengkap: string;
    email: string;
    no_hp: string;
    jenis_simulasi: string;
    plafond: number | null;
    created_at: string;
}

interface PageProps {
    simulasiSimpanans: SimulasiSimpanan[];
    totalUsers: number;
    totalSimulasi: number;
    simulasiHariIni: number;
    totalBerita: number;
    totalKarir: number;
    totalPengunjung: number;
    pengunjungHariIni: number;
    pengunjungBulanIni: number;
    [key: string]: any;
}

export default function Dashboard() {
    const { props } = usePage();
    const {
        simulasiSimpanans,
        totalUsers,
        totalSimulasi,
        simulasiHariIni,
        totalBerita,
        totalKarir,
        totalPengunjung,
        pengunjungHariIni,
        pengunjungBulanIni,
    } = props as unknown as PageProps;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-md p-4">

                {/* Row 1: Total Pengunjung - 2 kolom */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Pengunjung
                            </CardTitle>
                            <Eye className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalPengunjung?.toLocaleString() || '0'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Pengunjung unik (berdasarkan IP)
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pengunjung Hari Ini
                            </CardTitle>
                            <CalendarDays className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {pengunjungHariIni?.toLocaleString() || '0'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {pengunjungBulanIni > 0
                                    ? `${pengunjungBulanIni} pengunjung bulan ini`
                                    : 'Belum ada pengunjung hari ini'}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Row 2: Summary lainnya - 2 kolom */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total User
                            </CardTitle>
                            <Users className="h-4 w-4 text-sky-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalUsers?.toLocaleString() || '0'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Terdaftar di sistem
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Simulasi
                            </CardTitle>
                            <Calculator className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalSimulasi?.toLocaleString() || '0'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {simulasiHariIni > 0
                                    ? `+${simulasiHariIni} simulasi hari ini`
                                    : 'Belum ada simulasi hari ini'}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Berita
                            </CardTitle>
                            <Newspaper className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalBerita?.toLocaleString() || '0'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Berita telah dipublikasi
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Karir
                            </CardTitle>
                            <Briefcase className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalKarir?.toLocaleString() || '0'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Lowongan tersedia
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabel Simulasi Simpanan */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Data Simulasi Simpanan</CardTitle>
                        <CardDescription>
                            Daftar pengguna yang baru saja melakukan simulasi
                            simpanan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">
                                            No
                                        </TableHead>
                                        <TableHead>Nama Lengkap</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>No HP</TableHead>
                                        <TableHead>Jenis Simulasi</TableHead>
                                        <TableHead>Plafond</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {simulasiSimpanans &&
                                    simulasiSimpanans.length > 0 ? (
                                        simulasiSimpanans.map(
                                            (simulasi, index) => (
                                                <TableRow key={simulasi.id}>
                                                    <TableCell className="font-medium">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {simulasi.nama_lengkap}
                                                    </TableCell>
                                                    <TableCell>
                                                        {simulasi.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {simulasi.no_hp}
                                                    </TableCell>
                                                    <TableCell className="capitalize">
                                                        {simulasi.jenis_simulasi}
                                                    </TableCell>
                                                    <TableCell>
                                                        {simulasi.plafond
                                                            ? formatCurrencyIDR(simulasi.plafond)
                                                            : '-'}
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                className="h-24 text-center"
                                            >
                                                Belum ada data simulasi
                                                simpanan.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = (page: any) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Dashboard',
                href: dashboard(),
            },
        ]}
    >
        {page}
    </AppLayout>
);
