import { Facebook, Twitter, Youtube, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className="border-t-2 border-gray-500 py-10 px-20 flex flex-row justify-between">
            <div className="">
                <label className='font-bold'>ComputerShop.net</label>
                <div className='flex flex-col'>
                    <Link href="./">Home</Link>
                    <Link href="./">About us</Link>
                    <Link href="./">Store regulations</Link>
                    <Link href="./">Cookies</Link>
                </div>
            </div>
            <div>
                <label className='font-bold'>Do you have some questions?</label>
                <Link href="./" className='flex flex-row'> <Phone className='mr-2'/> Contact</Link>
                
            </div>
            <div className="">
                <label className='font-bold'>You will find us there:</label>
                <div className='flex flex-row'>
                    <Facebook />
                    <Twitter />
                    <Youtube />
                </div>
            </div>
            
        </div>
    )
}

export default Footer;