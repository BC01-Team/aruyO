import Link from "next/link";

const SpecialThanks = () => {
  return (
    <ul>
      <li>
        <Link href="/specialThanks" className="hover:underline">
          ○○社様(url,url,...)
        </Link>
      </li>
    </ul>
  );
};

export default SpecialThanks;
