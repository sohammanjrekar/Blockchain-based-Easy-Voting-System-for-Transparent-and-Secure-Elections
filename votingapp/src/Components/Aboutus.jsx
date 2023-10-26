import React from 'react'

const Aboutus = () => {
  return (
    <div>
      <>
  {/* component */}
  <div className="py-16 bg-white">
    <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div className="md:5/12 lg:w-5/12">
          <img
            src="https://www.solulab.com/wp-content/uploads/2021/04/blockchain-based-decentralised-voting-system-1.png"
            alt="image"
            loading="lazy"
            width=""
            height=""
          />
        </div>
        <div className="md:7/12 lg:w-6/12">
          <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
          About Us: Revolutionizing Voting
          </h2>
          <p className="mt-6 text-gray-600">
          We are voteChain, a passionate team dedicated to revolutionizing the way we vote. Our mission is to bring transparency and security to elections by harnessing blockchain technology. We're committed to making voting accessible and reliable for all, redefining the way we shape our collective future.
          </p>
        </div>
      </div>
    </div>
  </div>
  {/* component */}
  <link
    rel="stylesheet"
    href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
  />
  <link
    rel="stylesheet"
    href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
  />
  <section className="relative pt-16 bg-blueGray-50">
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center">
        <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-500">
            <img
              alt="..."
              src="https://topappdevelopmentcompanies.com/frontassets/blogupload/blogimg/cropped-what-is-a-dapp-1-1600x800.jpg"
              className="w-full align-middle rounded-t-lg"
            />
            <blockquote className="relative p-8 mb-4">
              <svg
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 583 95"
                className="absolute left-0 w-full block h-95-px -top-94-px"
              >
                <polygon
                  points="-30,95 583,95 583,65"
                  className="text-pink-500 fill-current"
                />
              </svg>
              <h4 className="text-xl font-bold text-white">
                Great for Democracy
              </h4>
              <p className="text-md font-light mt-2 text-white">
              We are voteChain, a passionate team dedicated to revolutionizing the way we vote. Our mission is to bring transparency and security to elections by harnessing blockchain technology. We're committed to making voting accessible and reliable for all, redefining the way we shape our collective future.
              </p>
            </blockquote>
          </div>
        </div>
        <div className="w-full md:w-6/12 px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 px-4">
              <div className="relative flex flex-col mt-4">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <i className="fas fa-sitemap" />
                  </div>
                  <h6 className="text-xl mb-1 font-semibold">Secure and Transparent Elections</h6>
                  <p className="mb-4 text-blueGray-500">
                  Our project ensures the security and transparency of the voting process. By utilizing blockchain technology, we eliminate the risk of tampering and provide a publicly verifiable record of each vote, giving voters confidence in the electoral system.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col min-w-0">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <i className="fas fa-drafting-compass" />
                  </div>
                  <h6 className="text-xl mb-1 font-semibold">
                  Accessibility for All
                  </h6>
                  <p className="mb-4 text-blueGray-500">
                  We believe that every voice matters. Our platform is designed to be user-friendly and accessible to all, including those with disabilities. We're committed to breaking down barriers that may have previously limited participation in the electoral process.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 mt-4">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <i className="fas fa-newspaper" />
                  </div>
                  <h6 className="text-xl mb-1 font-semibold"> Empowering Decentralization</h6>
                  <p className="mb-4 text-blueGray-500">
                  We're decentralizing voting by utilizing blockchain's decentralized ledger, reducing the influence of intermediaries, and allowing for greater direct participation. This empowers individuals to have a say in the decisions that affect their lives.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col min-w-0">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <i className="fas fa-file-alt" />
                  </div>
                  <h6 className="text-xl mb-1 font-semibold">Data-Driven Insights</h6>
                  <p className="mb-4 text-blueGray-500">
                  Our project also provides valuable data-driven insights into voting patterns and demographics. This data can be used to inform policy decisions and drive improvements in the electoral process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>
</>

    </div>
  )
}

export default Aboutus
