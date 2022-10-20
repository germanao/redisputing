import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="full_bg">
      <div className="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <ul className="contat_infoma">
                  <li>
                    <i className="fa fa-phone" aria-hidden="true"></i> Call :
                    +01 12345678909
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="social_icon_top text_align_center  ">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <ul className="contat_infoma text_align_right">
                  <li>
                    <a href="Javascript:void(0)">
                      {' '}
                      <i className="fa fa-phone" aria-hidden="true"></i>{' '}
                      demo@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="header_bottom">
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                    <div className="full">
                      <div className="center-desk">
                        <div className="logo">
                          <a href="index.html">Rhino</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                    <nav className="navigation navbar navbar-expand-md navbar-dark ">
                      <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExample04"
                        aria-controls="navbarsExample04"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div
                        className="collapse navbar-collapse"
                        id="navbarsExample04"
                      >
                        <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                            <a className="nav-link" href="index.html">
                              Home
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="about.html">
                              About
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="project.html">
                              project
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="staff.html">
                              staff
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="contact.html">
                              Contact Us
                            </a>
                          </li>
                        </ul>
                      </div>
                      <ul className="search">
                        <li>
                          <a href="Javascript:void(0)">
                            <i className="fa fa-search" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="banner_main">
        <div
          id="myCarousel"
          className="carousel slide banner"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="carousel-caption  banner_po">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="build_box">
                        <h1>We Are Builders</h1>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority
                          <br /> There are many variations of passages of
                        </p>
                        <a
                          className="read_more conatct_btn"
                          href="contact.html"
                          role="button"
                        >
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="carousel-caption banner_po">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="build_box">
                        <h1>We Are Builders</h1>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority
                          <br /> There are many variations of passages of
                        </p>
                        <a
                          className="read_more conatct_btn"
                          href="contact.html"
                          role="button"
                        >
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="carousel-caption banner_po">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="build_box">
                        <h1>We Are Builders</h1>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority
                          <br /> There are many variations of passages of
                        </p>
                        <a
                          className="read_more conatct_btn"
                          href="contact.html"
                          role="button"
                        >
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#myCarousel"
            role="button"
            data-slide="prev"
          >
            <i className="fa fa-angle-left" aria-hidden="true"></i>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#myCarousel"
            role="button"
            data-slide="next"
          >
            <i className="fa fa-angle-right" aria-hidden="true"></i>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>
    </header>
  )
}

export default Header
