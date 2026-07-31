const Footer = () => {
    return (
        <footer className="border-t border-amber-900/30 bg-linear-to-r from-[#2B1D14] via-[#7A5A2A] to-[#0F0F0F] py-2">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-sm md:flex-row">
                <p className="text-amber-50">
                    &copy; {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-amber-300">
                        Maa Furniture
                    </span>. All rights reserved.
                </p>

                <div className="flex flex-col items-center text-amber-100 md:items-end">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                        Location
                    </span>
                    <span>Barpeta, Assam, India</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;