import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="hidden md:flex text-sm">
      <ul className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;