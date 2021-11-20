// TODO Change the background image of the banner
const Banner = () => {
    return (
        <section className="pt-10 mt-10 banner banner-background text-center" style={{ backgroundColor: '#2d2f33;' }}>
            <div className={'background-banner'}></div>
            <div className="container">
                <div className="banner-content">
                    <h4 className="banner-subtitle text-white font-weight-bold ls-l">
                        Extra<span className="d-inline-block label-star bg-dark text-primary ml-4 mr-2">30%
                            Off</span>Online
                    </h4>
                    <h3 className="banner-title font-weight-bold text-white">Summer Season Sale</h3>
                    <p className="text-white ls-s">Free delivering on orders over GHC 200</p>
                    <a href="shop.html" className="btn btn-primary btn-rounded btn-icon-right">Shop Now<i
                        className="d-icon-arrow-right"></i></a>
                </div>
            </div>
        </section>
    );
};

export default Banner;
