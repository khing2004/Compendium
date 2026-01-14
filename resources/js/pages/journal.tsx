import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import JournalIndex, { Props } from '@/components/journal';
import journal from '@/routes/journal';
//import { Props } from 'recharts/types/container/Surface';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Journal',
        href: '/journal',
    },
];


export default function Journal(props: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <JournalIndex
                entries={props.entries}
            />
        </AppLayout>
    );
}
