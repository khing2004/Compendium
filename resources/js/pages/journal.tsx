import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import JournalIndex from '@/components/journal';
import journal from '@/routes/journal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Journal',
        href: '/journal',
    },
];

interface JournalProps {
    dataEntries: any[];
}

export default function Journal() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <JournalIndex/>
        </AppLayout>
    );
}
