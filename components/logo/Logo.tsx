import Image from "next/image";
import logo from "@/public/icons/logo.svg";

const Logo = () => {
  return <Image src={logo} alt="Logo" width={47} height={57}></Image>;
};

export default Logo;
