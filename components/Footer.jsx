const Footer = () => {
    return (
        <footer className=" text-black py-8 mx-auto p-10">
            <div className="container mx-auto px-4">
                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-sm text-black">
                            We provide a secure and transparent shipment tracking system utilizing blockchain technology to ensure that your shipments are fully traceable, immutable, and verifiable.
                        </p>
                    </div>
                    
                    {/* Useful Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm text-black hover:text-white">Home</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-black hover:text-white">Services</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-black hover:text-white">Contact Us</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-black hover:text-white">ERC-20</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-black hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.734 0-1.325.591-1.325 1.325v21.351c0 .734.591 1.324 1.325 1.324h11.497v-9.285h-3.122v-3.622h3.122v-2.672c0-3.1 1.892-4.785 4.654-4.785 1.321 0 2.458.098 2.788.143v3.23h-1.913c-1.504 0-1.795.715-1.795 1.763v2.322h3.589l-.467 3.622h-3.122v9.285h6.129c.734 0 1.325-.591 1.325-1.325v-21.351c0-.734-.591-1.325-1.325-1.325z"/></svg>
                            </a>
                            <a href="#" className="text-black hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 5.804 2.601 5.804 5.804 0 1.325-.44 2.542-1.175 3.528-.239.324-.492.631-.761.912-.327.34-.677.649-1.048.922-.292.201-.602.374-.923.515-.401.17-.825.286-1.269.344-.514.071-1.036.109-1.565.109-.529 0-1.051-.038-1.565-.109-.445-.058-.868-.174-1.269-.344-.321-.141-.631-.314-.923-.515-.371-.273-.721-.582-1.048-.922-.269-.281-.522-.588-.761-.912-.735-.986-1.175-2.203-1.175-3.528 0-3.204 2.6-5.804 5.804-5.804m0-2.163c-4.417 0-8.004 3.587-8.004 8.004s3.587 8.004 8.004 8.004c4.417 0 8.004-3.587 8.004-8.004s-3.587-8.004-8.004-8.004zm4.222 8.004c0-.638-.516-1.154-1.154-1.154-.638 0-1.154.516-1.154 1.154s.516 1.154 1.154 1.154c.638 0 1.154-.516 1.154-1.154zm-4.222 4.222c-1.936 0-3.507-1.57-3.507-3.507 0-.551.126-1.071.351-1.547-.519.353-.876.923-.876 1.597 0 1.097.891 1.988 1.988 1.988.674 0 1.244-.357 1.597-.876-.476.225-.996.351-1.547.351zm-4.222 0c.474 0 .854-.377.854-.854 0-.474-.38-.854-.854-.854-.474 0-.854.38-.854.854 0 .477.38.854.854.854z"/></svg>
                            </a>
                            <a href="#" className="text-black hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0h-20.46c-.98 0-1.77.79-1.77 1.77v20.46c0 .98.79 1.77 1.77 1.77h20.46c.98 0 1.77-.79 1.77-1.77v-20.46c0-.98-.79-1.77-1.77-1.77zm-12.46 19.5h-3v-9h3v9zm-1.5-10.5c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm10.5 10.5h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2v4.5h-3v-9h3v1.25c.41-.69 1.36-1.25 2.5-1.25 1.93 0 3.5 1.57 3.5 3.5v5.5z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-black">
                                Email: support@blockchainshipment.com
                            </li>
                            <li className="text-sm text-black">
                                Phone: +1 234 567 8901
                            </li>
                            <li className="text-sm text-black">
                                Address: 123 Blockchain Street, Crypto City, BC 10101
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="mt-8 border-t border-gray-700 pt-4">
                    <p className="text-sm text-black text-center">
                        &copy; {new Date().getFullYear()} Blockchain Shipment Tracking System. All rights reserved.
                    </p>
                    <p className="text-sm text-black text-center mt-2">
                        <a href="#" className="hover:underline">Privacy Policy</a> | <a href="#" className="hover:underline">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
