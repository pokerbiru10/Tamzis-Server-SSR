import { Head, usePage } from '@inertiajs/react';
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
    plafond: number | null;
    created_at: string;
}

interface PageProps {
    simulasiSimpanans: SimulasiSimpanan[];
    jenis: string;
    [key: string]: any;
}

export default function DashboardSimulasi() {
    const { props } = usePage();
    const { simulasiSimpanans, jenis } = props as unknown as PageProps;

    const title = `Data Simulasi ${jenis.charAt(0).toUpperCase() + jenis.slice(1)}`;

    return (
        <>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-md p-4">
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>
                            Daftar pengguna yang melakukan {title.toLowerCase()}
                            .
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
                                                colSpan={5}
                                                className="h-24 text-center"
                                            >
                                                Belum ada data simulasi untuk
                                                kategori ini.
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

DashboardSimulasi.layout = (page: any) => (
    <AppLayout
        breadcrumbs={[
            {
                title: 'Dashboard',
                href: dashboard(),
            },
            {
                title: 'Simulasi',
                href: '#',
            },
        ]}
    >
        {page}
    </AppLayout>
);
