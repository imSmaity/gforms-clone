import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image src={logo} alt="Logo" width={47} height={57} />
    </Link>
  );
};

export default Logo;
