import { redirect } from 'next/navigation';

const colors = [
  'red', 'blue', 'green', 'yellow', 'purple',
  'orange', 'pink', 'teal', 'indigo', 'cyan'
];

export default function ColorPage({ params }: { params: { color: string } }) {
  if (!colors.includes(params.color)) {
    redirect('/');
  }
  return null;
}

export function generateStaticParams() {
  return colors.map(color => ({ color }));
}