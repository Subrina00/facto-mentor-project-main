
import BarChart from "../../components/atoms/BarChart";

import { Homo } from "../../utils/images/home.image";
import { card1 } from "../../utils/images/card1.image";
import { card2 } from "../../utils/images/card2.image";
import { card3 } from "../../utils/images/card3.image";
import { sale } from "../../utils/images/sale.image";
import { avgsale } from "../../utils/images/avgsale.image";
import { dollar } from "../../utils/images/dollar.image";
import { man1 } from "../../utils/images/man1.image";
import { man2 } from "../../utils/images/man2.image";
import { man3 } from "../../utils/images/man3.image";
import { man4 } from "../../utils/images/man4.image";
import { man5 } from "../../utils/images/man5.image";
import { man6 } from "../../utils/images/man6.image";
import { nine } from "../../utils/images/nine.image";
import { line } from "../../utils/images/line.image";
import { company1 } from "../../utils/images/company1.image";
import { company2 } from "../../utils/images/company2.image";
import { company3 } from "../../utils/images/company3.image";
import { company4 } from "../../utils/images/company4.image";
import { company5 } from "../../utils/images/company5.image";
import { cash1 } from "../../utils/images/cash1.image";
import { cash2 } from "../../utils/images/cash2.image";
import { cash3 } from "../../utils/images/cash3.image";

export function meta() {
  return [{ title: "Home" }, { name: "Home", content: "Welcome to facto" }];
}
const Home: React.FC = () => {
  return (
    <div>
      {/* hero section */}
      <div className="container container-pad">

        <div className="mt-[100px] md:mt-[130px] lg:mt-[141px] max-w-[320px] sm:max-w-[591px] md:max-w-[701px] lg:max-w-[901px] xl:max-w-[950px] 2xl:max-w-[1042px]
         flex flex-col justify-center items-center gap-[22px] sm:gap-[26px] md:gap-[30px] lg:gap-[32px] mx-auto">

          <div className="max-w-[165px] sm:max-w-[210px] md:max-w-[272px] lg:max-w-[279px] max-h-[42px]">
            <p className="font-manrope font-medium w-full h-full text-[12px] sm:text-[14px] md:text-[18px] lg:text-[20px] text-center leading-[24px]
             md:leading-[26px] text-primary bg-[#DFEDE3] rounded-[999px] px-[12px] py-[6px] sm:px-[22px] sm:py-[7px] lg:px-[24px] lg:py-[8px]">Fast. secure. hassle-free</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-[18px] sm:gap-[20px] md:gap-[22px] lg:gap-[24px]">
            <div className="w-[319px] sm:w-[590px] md:w-[700px] lg:w-[900px] xl:w-[949px] 2xl:w-[1041px]">
              <h3 className="font-roboto w-full font-extrabold text-[21px] sm:text-[40px] md:text-[48px] lg:text-[62px] xl:text-[66px] 2xl:text-[72px]
               leading-[45px] sm:leading-[68px] md:leading-[72px] lg:leading-[76px] xl:leading-[82px] text-center text-[#141414]">
                Get Paid Faster <img src={Homo} alt="home" className="w-[34px] h-[22px] sm:w-[58px] sm:h-[38px] md:w-[62px] md:h-[42px] lg:w-[66px] lg:h-[44px] xl:w-[72px] xl:h-[48px] inline-flex" /> Instant Cash for Businesses!</h3>
            </div> 
            <div>
              <p className="text-[12px] sm:text-[14px] md:text-[17px] lg:text-[21px] xl:text-[22px] 2xl:text-[24px] font-manrope font-normal
               leading-[20px] sm:leading-[30px] md:leading-[32px] lg:leading-[36px] xl:leading-[36px] text-[#686868] text-center">Stop waiting months for credit card payments. CASA helps business owners access cash instantly by
                 converting card transactions into immediate funds.</p>
            </div>
          </div>

          <div className="mt-[7px] sm:mt-[9px] md:mt-[13px] lg:mt-[16px] max-w-[192px] max-h-[58px]">
            <button type="button" className=" w-full h-full text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-manrope font-semibold leading-[24px]
            px-[32px] py-[12px] md:px-[35px] md:py-[14px] lg:px-[38px] lg:py-[15px] xl:px-[40px] xl:py-[16px] text-white bg-primary rounded-[999px]">Get Started</button>
          </div>

        </div>


        <div className="mt-[130px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-[36px]">

            {/* card 1 */}
            <div className="bg-[#E0F0E5] max-h-[600px] xl:max-h-[600px] md:max-h-[600px] sm:max-h-[665px] lg:max-h-[665px] 2xl:max-h-[665px]
             max-w-[340px] sm:max-w-[457px] md:max-w-[360px] lg:max-w-[457px] xl:max-w-[360px] 2xl:max-w-[457px] flex flex-col justify-between
             items-center gap-[42px] md:gap-[42px] xl:gap-[42px] sm:gap-[50px] lg:gap-[50px] 2xl:gap-[50px] py-[46px] px-[28px] rounded-[24px] mx-auto">
              <div className="flex justify-between items-start gap-[20px] md:gap-[20px] xl:gap-[20px] sm:gap-[24px] lg:gap-[24px] 2xl:gap-[24px]">
                <img src={card1} alt="" className="w-[32px] h-[32px] md:w-[32px] md:h-[32px] xl:w-[32px] xl:h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[40px] lg:h-[40px] 2xl:w-[40px] 2xl:h-[40px]" />
                <h3 className="font-roboto font-semibold text-[27px] md:text-[27px] xl:text-[27px] sm:text-[32px] lg:text-[32px] 2xl:text-[32px]
                 leading-[32px] md:leading-[32px] xl:leading-[32px] sm:leading-[40px] lg:leading-[40px] 2xl:leading-[40px] text-[#141414]">Sales overview from Previous Day</h3>
              </div>
              <div className="max-w-[300px] sm:max-w-[400px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[300px] 2xl:max-w-[400px]
               max-h-[300px] sm:max-h-[361px] md:max-h-[300px] lg:max-h-[361px] xl:max-h-[300px] 2xl:max-h-[361px] rounded-[24px] bg-white">
                <div className="flex justify-between items-center gap-[14px] sm:gap-[16px] md:gap-[14px] lg:gap-[16px] xl:gap-[14px] 2xl:gap-[16px]
                 pt-[24px] sm:pt-[32px] md:pt-[24px] lg:pt-[32px] xl:pt-[24px] 2xl:pt-[32px] pl-[24px] sm:pl-[32.5px] md:pl-[24px] lg:pl-[32.5px]
                  xl:pl-[24px] 2xl:pl-[32.5px] pr-[42px] sm:pr-[59.5px] md:pr-[42px] lg:pr-[59.5px] xl:pr-[42px] 2xl:pr-[59.5px]">
                  <img src={sale} alt="" />
                  <p className="text-[#686868] font-medium font-manrope text-[18px] md:text-[18px] xl:text-[18px] leading-[30px] md:leading-[30px]
                   xl:leading-[30px] sm:text-[24px] lg:text-[24px] 2xl:text-[24px] sm:leading-[36px] lg:leading-[36px] 2xl:leading-[36px]">Total sales : 
                     <span className="font-roboto font-bold text-[22px] md:text-[22px] xl:text-[22px] leading-[30px] md:leading-[30px] xl:leading-[30px] sm:text-[32px]
                      lg:text-[32px] 2xl:text-[32px] sm:leading-[40px] lg:leading-[40px] 2xl:leading-[40px]"> $12,500</span></p>
                </div>
                <div className="px-[33px] pb-[10px] md:pb-[10px] xl:pb-[10px] sm:pb-[27px] lg:pb-[27px] 2xl:pb-[27px] h-[179px]
                 mt-[76px] md:mt-[76px] xl:mt-[76px] sm:mt-[83px] lg:mt-[83px] 2xl:mt-[83px]">
                  <BarChart />
                </div>

              </div>
              <div className="rounded-[24px] px-[14px] md:px-[14px] xl:px-[14px] sm:px-[22px] lg:px-[22px] 2xl:px-[22px] py-[14px] md:py-[14px] xl:py-[14px] sm:py-[16px] lg:py-[16px] 2xl:py-[16px] bg-[#BFE5A6] flex justify-between items-center
               gap-[7px] md:gap-[7px] xl:gap-[7px] sm:gap-[10px] lg:gap-[10px] 2xl:gap-[10px] max-w-[300px] md:max-w-[300px] xl:max-w-[300px] sm:max-w-[400px] lg:max-w-[400px] 2xl:max-w-[400px]">
                <img src={avgsale} alt="" />
                <p className="font-roboto font-normal text-[#141414] text-[14px] md:text-[14px] xl:text-[14px] md:leading-[20px] xl:leading-[20px]
                 leading-[20px] sm:text-[20px] lg:text-[20px] 2xl:text-[20px] sm:leading-[32px] lg:leading-[32px] 2xl:leading-[32px]">Avg. sale: $104.16 / per transection</p>
              </div>

            </div>

            {/* card 2 */}

            <div className="bg-[#DAFFC2] max-h-[600px] xl:max-h-[600px] md:max-h-[600px] sm:max-h-[665px] lg:max-h-[665px] 2xl:max-h-[665px]
             max-w-[340px] sm:max-w-[457px] md:max-w-[360px] lg:max-w-[457px] xl:max-w-[360px] 2xl:max-w-[457px] flex flex-col justify-between
             items-center gap-[42px] md:gap-[42px] xl:gap-[42px] sm:gap-[48px] lg:gap-[48px] 2xl:gap-[48px] py-[46px] px-[28px] rounded-[24px] mx-auto">
              <div className="flex justify-between items-start gap-[20px] md:gap-[20px] xl:gap-[20px] sm:gap-[24px] lg:gap-[24px] 2xl:gap-[24px]">
                <img src={card2} alt="" className="w-[32px] h-[32px] md:w-[32px] md:h-[32px] xl:w-[32px] xl:h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[40px] lg:h-[40px] 2xl:w-[40px] 2xl:h-[40px]" />
                <h3 className="font-roboto font-semibold text-[27px] md:text-[27px] xl:text-[27px] sm:text-[32px] lg:text-[32px] 2xl:text-[32px]
                 leading-[32px] md:leading-[32px] xl:leading-[32px] sm:leading-[40px] lg:leading-[40px] 2xl:leading-[40px] text-[#141414]">Factoring Possible Amount.</h3>
              </div>
              <div className="flex flex-col justify-between items-center gap-[36px] 2xl:gap-[36px]">
                <div className="bg-white rounded-[25px] p-[22px] sm:p-[24px] md:p-[22px] lg:p-[24px] xl:p-[22px] 2xl:p-[24px]
                 max-w-[245px] max-h-[105px] sm:max-h-[125px] md:max-h-[105px] lg:max-h-[125px] xl:max-h-[105px] 2xl:max-h-[125px]">
                  <p className="font-manrope font-normal text-[20px] sm:text-[24px] md:text-[20px] lg:text-[24px] xl:text-[20px] 2xl:text-[24px]
                   leading-[30px] sm:leading-[36px] md:leading-[30px] lg:leading-[36px] xl:leading-[30px] 2xl:leading-[36px] text-[#686868] text-center">Available amount</p>
                  <p className="text-[#141414] mt-[12px] font-roboto font-semibold text-[28px] sm:text-[32px] md:text-[28px] lg:text-[32px] xl:text-[28px] 2xl:text-[32px]
                   leading-[30px] sm:leading-[40px] md:leading-[30px] lg:leading-[40px] xl:leading-[30px] 2xl:leading-[40px] text-center">$15,375 
                    <span className="text-[14px] sm:text-[18px] md:text-[14px] lg:text-[18px] xl:text-[14px] 2xl:text-[18px]
                     leading-[20px] sm:leading-[30px] md:leading-[20px] lg:leading-[30px] xl:leading-[20px] 2xl:leading-[30px] ml-[24px]">USD</span></p>
                </div>
                <div className="bg-white flex flex-col justify-between items-center gap-[30px] p-[24px] rounded-[25px] max-w-[400px]">
                  <div className="flex justify-between items-start gap-[16px]">
                    <img src={dollar} alt="" />
                    <p className="font-[500] font-roboto text-[20px] sm:text-[24px] md:text-[20px] lg:text-[24px] xl:text-[20px] 2xl:text-[24px]
                     leading-[26px] sm:leading-[32px] md:leading-[26px] lg:leading-[32px] xl:leading-[26px] 2xl:leading-[32px] text-[#141414]">Factored amount vs. remaining balance</p>
                  </div>
                  <div className="bg-[#E0F0E5] p-[7px] sm:p-[13px] md:p-[7px] lg:p-[13px] xl:p-[7px] 2xl:p-[13px] rounded-[24px] max-w-[374px] relative">
                    <p className="font-roboto font-semibold p-[7px] sm:p-[11px] md:p-[7px] lg:p-[11px] xl:p-[7px] 2xl:p-[11px]
                     text-[14px] sm:text-[20px] md:text-[14px] lg:text-[20px] xl:text-[14px] 2xl:text-[20px] leading-[24px] sm:leading-[28px] md:leading-[24px] lg:leading-[28px] xl:leading-[24px] 2xl:leading-[28px] text-[#686868] max-w-[326px] text-center">Factored Balance 
                      <span className="text-[#141414] font-bold text-[17px] sm:text-[24px] md:text-[17px] lg:text-[24px] xl:text-[17px] 2xl:text-[24px]
                       leading-[20px] sm:leading-[34px] md:leading-[20px] lg:leading-[34px] xl:leading-[20px] 2xl:leading-[34px] ml-[7px] sm:ml-[20px] md:ml-[7px] lg:ml-[20px] xl:ml-[7px] 2xl:ml-[20px]">$11,531.25</span></p>
                    <p className="absolute font-bold text-[18px] top-[62px] sm:top-[85px] md:top-[62px] lg:top-[85px] xl:top-[62px] 2xl:top-[85px]
                     left-[132px] sm:left-[220px] md:left-[132px] lg:left-[220px] xl:left-[132px] 2xl:left-[220px]">75%</p>
                    <div className="h-[15px] bg-gray-100 rounded-full overflow-hidden max-w-[305px] mt-[48px] sm:mt-[45px] md:mt-[48px] lg:mt-[45px] xl:mt-[48px] 2xl:mt-[45px] mb-[11px]">
                      <div className="h-full bg-[#0F4E23] rounded-full w-[150px] md:w-[150px] xl:w-[150px] sm:w-[228px] lg:w-[228px] 2xl:w-[228px]"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* card 3 */}

            <div className="bg-[#F1F68E] max-h-[600px] xl:max-h-[600px] md:max-h-[600px] sm:max-h-[665px] lg:max-h-[665px] 2xl:max-h-[665px]
             max-w-[340px] sm:max-w-[457px] md:max-w-[360px] lg:max-w-[457px] xl:max-w-[360px] 2xl:max-w-[457px] flex flex-col justify-between
              items-center gap-[40px] py-[46px] px-[24px] rounded-[24px] mx-auto">
              <div className="flex justify-between items-start gap-[20px] md:gap-[20px] xl:gap-[20px] sm:gap-[24px] lg:gap-[24px] 2xl:gap-[24px] mx-auto">
                <img src={card3} alt="" className="w-[32px] h-[32px] md:w-[32px] md:h-[32px] xl:w-[32px] xl:h-[32px] sm:w-[40px] sm:h-[40px] lg:w-[40px] lg:h-[40px] 2xl:w-[40px] 2xl:h-[40px]" />
                <h3 className="font-roboto font-semibold text-[24px] sm:text-[32px] md:text-[24px] lg:text-[32px] xl:text-[24px] 2xl:text-[32px] leading-[30px] 2xl:leading-[40px] text-[#141414]">Secure & Streamlined Workflow</h3>
              </div>
              <div className="flex flex-col justify-between items-center gap-[28px] max-h-[459px]">
                <div className="max-w-[266.5px] max-h-[124.69px] py-[20px] px-[24px] rounded-[25px] bg-white flex flex-col 
                justify-between gap-[16px] relative -rotate-[12.89deg] top-[15px] sm:top-[20px] md:top-[15px] lg:top-[20px] xl:top-[15px] 2xl:top-[20px]">
                  <p className="text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px] leading-[34px] text-center">Recent User
                     <span className="font-semibold text-[14px] leading-[24px] text-[#686868] ml-[24px]">View All</span></p>
                  <div className="flex justify-between items-center">
                    <img src={man1} alt=""className="relative" />
                    <img src={man2} alt=""className="relative right-[10px]" />
                    <img src={man3} alt=""className="relative right-[20px]" />
                    <img src={man4} alt=""className="relative right-[30px]" />
                    <img src={man5} alt=""className="relative right-[40px]" />
                    <img src={nine} alt=""className="relative right-[50px]" />
                  </div>
                </div>
                <div className="bg-white max-h-[150px] sm:max-h-[166px] md:max-h-[150px] lg:max-h-[166px] xl:max-h-[150px] 2xl:max-h-[166px] max-w-[195px] rounded-[25px] px-[24px] py-[20px] flex flex-col 
                justify-between gap-[14px] sm:gap-[16px] md:gap-[14px] lg:gap-[16px] xl:gap-[14px] 2xl:gap-[16px] relative rotate-[2.5deg] top-[8px] sm:top-[10px] md:top-[8px] lg:top-[10px] xl:top-[8px] 2xl:top-[10px]
                 left-[65px] sm:left-[80px] md:left-[65px] lg:left-[80px] xl:left-[65px] 2xl:left-[80px]">
                  <div className="flex flex-col justify-between gap-[16px]">
                    <p className="text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px] leading-[24px] 2xl:leading-[30px]">Total balance</p>
                    <p className="text-[#141414] font-roboto font-bold text-[26px] sm:text-[32px] md:text-[26px] lg:text-[32px] xl:text-[26px] 2xl:text-[32px] leading-[30px] 2xl:leading-[40px]">23,576.00</p>
                  </div>
                    
                  <p className="text-[#686868] font-manrope font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px] leading-[20px] 2xl:leading-[26px]">
                    <span className="bg-[#E0F0E5] inline-flex justify-center items-center h-[20px] w-[20px] rounded-full mr-[16px]">+</span>
                    Add Number</p>
                  
                </div>
                <div className="bg-white max-w-[373px] max-h-[96px] rounded-[25px] py-[16px] px-[18px] sm:px-[24px] md:px-[18px] lg:px-[24px] xl:px-[18px] 2xl:px-[24px] flex justify-between
                 items-center gap-[22px] sm:gap-[26px] md:gap-[22px] lg:gap-[26px] xl:gap-[22px] 2xl:gap-[26px] relative rotate-[6.68deg] -top-[13px]">
                  <img src={man6} alt="" className="h-[52px] w-[52px] 2xl:h-[56px] 2xl:w-[56px]" />
                  <div className="flex justify-between items-center gap-[22px] max-w-[244px]">
                    <div className="flex flex-col justify-between items-start gap-[10px] max-w-[126px]">
                      <p className="text-[#141414] font-roboto font-bold text-[20px] sm:text-[24px] md:text-[20px] lg:text-[24px] xl:text-[20px] 2xl:text-[24px] leading-[28px] 2xl:leading-[34px]">Online</p>
                      <p className="text-[#686868] font-manrope font-normal text-[12px] sm:text-[16px] md:text-[12px] lg:text-[16px] xl:text-[12px] 2xl:text-[16px]">Tomy Restaurant</p>
                    </div>
                    <div className="flex flex-col justify-between items-center gap-[12px]">
                      <p className="text-[#141414] font-roboto font-semibold text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px]
                       xl:text-[18px] 2xl:text-[20px] leading-[20px] sm:leading-[28px] md:leading-[20px] lg:leading-[28px] xl:leading-[20px] 2xl:leading-[28px]">+$10k</p>
                      <p className="bg-[#E0F0E5] rounded-[92px] py-[6px] sm:py-[8px] md:py-[6px] lg:py-[8px] xl:py-[6px] 2xl:py-[8px]
                      px-[12px] sm:px-[16px] md:px-[12px] lg:px-[16px] xl:px-[12px] 2xl:px-[16px] font-roboto font-semibold
                       text-[12px] sm:text-[14px] md:text-[12px] lg:text-[14px] xl:text-[12px] 2xl:text-[14px] text-[#0F4E23]">confirm</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* scroll bar */}

      <div className="mt-[4px] bg-[#0F4E23] max-h-[168px] mb-[130px] sm:mb-[160px]">
        <div className="container container-pad">

          <div className="flex justify-between items-center overflow-hidden">
            <div className="flex justify-center items-center gap-[27px] sm:gap-[40px] md:gap-[48px] lg:gap-[64px] xl:gap-[80px] 2xl:gap-[96px]
                 bg-[#0F4E23] z-50">
              <div className="flex flex-col justify-center items-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px] xl:min-w-[180px] 2xl:min-w-[200px]">
                <p className="text-[14px] sm:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-bold font-roboto text-white">Trusted By</p>
                <p className="text-[14px] sm:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-bold font-roboto text-white">Top Companies</p>
              </div>
              <img src={line} alt="" className="h-[30px] sm:h-[40px] md:h-[50px]" />
            </div>

            <div className="animate-marquee whitespace-nowrap flex justify-between items-center gap-[27px] sm:gap-[40px] md:gap-[48px] lg:gap-[64px] xl:gap-[80px] 2xl:gap-[96px] py-[50px]">
              <img src={company1} alt="" className="w-[50px] sm:w-[75px] md:w-[90] lg:w-[102] xl:w-[109] 2xl:w-[118px]" />
              <img src={company2} alt="" className="w-[50px] sm:w-[75px] md:w-[90] lg:w-[102] xl:w-[109] 2xl:w-[118px]" />
              <img src={company3} alt="" className="w-[50px] sm:w-[75px] md:w-[90] lg:w-[102] xl:w-[109] 2xl:w-[118px]" />
              <img src={company4} alt="" className="w-[50px] sm:w-[75px] md:w-[90] lg:w-[102] xl:w-[109] 2xl:w-[118px]" />
              <img src={company5} alt="" className="w-[50px] sm:w-[75px] md:w-[90] lg:w-[102] xl:w-[109] 2xl:w-[118px]" />
            </div>
          </div>

          

        </div>
      </div>

      {/* about section */}

      <div className="container container-pad ">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] sm:gap-[45px] lg:gap-[105px] xl:gap-[120px] lg:items-start mb-[133px]">
          <div className="max-w-[350px] sm:max-w-[450px] xl:max-w-[555px] 2xl:max-w-[680px] flex flex-col justify-between items-center lg:items-start gap-[22px] xl:gap-[28px] 2xl:gap-[32px]">
            <p className="bg-[#DFEDE3] py-[6px] px-[22px] xl:py-[8px] xl:px-[24px] text-[#0F4E23] font-manrope font-semibold text-[16px] xl:text-[18px] 2xl:text-[20px] max-w-[220px]
             xl:max-w-[234px] rounded-[999px]">About Casa Service</p>
            <h3 className="text-[#141414] font-roboto font-extrabold text-[28px] sm:text-[34px] xl:text-[43px] 2xl:text-[56px]
             leading-[46px] sm:leading-[50px] lg:leading-[56px] 2xl:leading-[68px] text-center lg:text-start">Revolutionizing Cash Flow for Business Owners!</h3>
          </div>
          <div className="max-w-[360px] sm:max-w-[480px] xl:max-w-[590px] 2xl:max-w-[619px] flex flex-col justify-between items-center lg:items-start gap-[32px]">
            <p className="text-[#686868] font-manrope font-normal text-[14px] sm:text-[18px] xl:text-[22px] 2xl:text-[24px]
             leading-[28px] sm:leading-[32px] lg:leading-[36px] text-center lg:text-start">Empowering businesses with faster cash access, CASA provides a secure, fast, and flexible solution
               to get early payments for credit card sales.</p>
               <button type="button" className="bg-[#0F4E23] max-h-[50px] xl:max-h-[58px] py-[12px] px-[36px] xl:py-[14px] xl:px-[38px] 2xl:py-[16px] 2xl:px-[40px] text-white font-manrope
                font-semibold text-[18px] 2xl:text-[20px] rounded-[999px]">Join Now</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-[36px] mb-[160px]">
          {/* card1 */}
          <div className="bg-[#F8F8F8] rounded-[25px] p-[44px] sm:p-[48px] md:p-[44px] lg:p-[48px] xl:p-[44px] 2xl:p-[48px] flex flex-col justify-between items-start gap-[20px] sm:gap-[24px] md:gap-[20px] lg:gap-[24px] xl:gap-[20px] 2xl:gap-[24px] 
           max-h-[408px] max-w-[340px] sm:max-w-[456px] md:max-w-[340px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px] group mx-auto hover:bg-[#0F4E23] duration-300">
            <h3 className="text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px] leading-[40px] group-hover:text-white">Secure and Instant Cash Advances</h3>
            <img src={cash1} alt="" />
            <p className="text-[#686868] font-manrope font-normal text-[17px] sm:text-[20px] md:text-[17px] lg:text-[20px] xl:text-[17px] 2xl:text-[20px] leading-[32px] group-hover:text-white">No more waiting weeks—convert daily credit card transactions into cash
               within 24 hours to keep your business running smoothly.</p>
          </div>
          {/* card2 */}
          <div className="bg-[#F8F8F8] rounded-[25px] p-[44px] sm:p-[48px] md:p-[44px] lg:p-[48px] xl:p-[44px] 2xl:p-[48px] flex flex-col justify-between items-start gap-[20px] sm:gap-[24px] md:gap-[20px] lg:gap-[24px] xl:gap-[20px] 2xl:gap-[24px]  
           max-h-[408px] max-w-[340px] sm:max-w-[456px] md:max-w-[340px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px] group mx-auto hover:bg-[#0F4E23] duration-300">
            <h3 className="text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px] leading-[40px] group-hover:text-white">Transparent and Fair Pricing Process</h3>
            <img src={cash2} alt="" />
            <p className="text-[#686868] font-manrope font-normal text-[17px] sm:text-[20px] md:text-[17px] lg:text-[20px] xl:text-[17px] 2xl:text-[20px] leading-[32px] group-hover:text-white">No Hidden Fees, No Surprises Enjoy clear, upfront pricing
               with flexible funding options, so you always know what to expect.</p>
          </div>
          {/* card3 */}
          <div className="bg-[#F8F8F8] rounded-[25px] p-[44px] sm:p-[48px] md:p-[44px] lg:p-[48px] xl:p-[44px] 2xl:p-[48px] flex flex-col justify-between items-start
           gap-[20px] sm:gap-[24px] md:gap-[20px] lg:gap-[24px] xl:gap-[20px] 2xl:gap-[24px] 
           max-h-[408px] max-w-[340px] sm:max-w-[456px] md:max-w-[340px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px] group mx-auto hover:bg-[#0F4E23] duration-300">
            <h3 className="text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px] leading-[40px] group-hover:text-white">Flexible and Secure Payout Options</h3>
            <img src={cash3} alt="" />
            <p className="text-[#686868] font-manrope font-normal text-[17px] sm:text-[20px] md:text-[17px] lg:text-[20px] xl:text-[17px] 2xl:text-[20px] leading-[32px] group-hover:text-white">We offer flexible and easy payout options tailored to your needs,
               ensuring quick access to your funds. Choose from multiple payment methods</p>
          </div>
        </div>

      </div>

      {/* how it works */}

      <div className="bg-[#F8F8F8]">
        <div className="container container-pad">

          <div className="max-w-[350px] sm:max-w-[460px] md:max-w-[630px] lg:max-w-[750px] xl:max-w-[878px] flex flex-col justify-between
          items-center gap-[26px] sm:gap-[28px] md:gap-[30px] lg:gap-[32px] mx-auto pt-[160px] pb-[130px]">
            <p className="bg-[#DFEDE3] rounded-[999px] py-[6px] px-[22px] lg:py-[8px] lg:px-[24px] max-w-[168px] font-manrope
            font-semibold text-[15px] sm:text-[17px] lg:text-[18px] xl:text-[20px] text-[#0F4E23]">How it works</p>
            <h3 className="font-roboto font-extrabold text-[34px] sm:text-[37px] md:text-[48px] lg:text-[54px] xl:text-[56px] leading-[54px] sm:leading-[60px] md:leading-[64px] lg:leading-[68px] text-[#141414] text-center"> Simple & Fast Receive Your Payment in 3 Steps!</h3>
            <p className="text-[#686868] font-manrope font-normal text-[14px] sm:text-[16px] md:text-[17px] lg:text-[20px] xl:text-[24px] leading-[28px] sm:leading-[30px] md:leading-[33px] lg:leading-[36px] text-center">Empowering businesses with faster cash access, CASA provides a secure, fast,
              and flexible solution to get early payments for credit card sales</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-[36px] pb-[160px]">
            {/* card1 */}
            <div className="h-[718px] max-w-[350px] sm:max-w-[456px] md:max-w-[350px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px]
            flex flex-col justify-between items-center gap-[34px] sm:gap-[36px] md:gap-[34px] lg:gap-[36px] xl:gap-[34px] 2xl:gap-[36px]
              rounded-[25px] py-[32px] sm:py-[36px] md:py-[32px] lg:py-[36px] xl:py-[32px] 2xl:py-[36px] px-[26px] sm:px-[29px] md:px-[26px] lg:px-[29px] xl:px-[26px] 2xl:px-[29px] bg-white shadow-sm mx-auto">

              <div className="bg-[#DAFFC2] flex flex-col justify-between items-start gap-[24px] py-[33px] px-[20px] sm:px-[24px] md:px-[20px] lg:px-[24px] xl:px-[20px] 2xl:px-[24px]
              max-w-[330px] sm:max-w-[398px] md:max-w-[330px] lg:max-w-[398px] xl:max-w-[330px] 2xl:max-w-[398px] rounded-[25px]">
                <p className="text-[#141414] font-roboto font-bold text-[24px] pl-[6px]">Sign Up</p>
                <input type="text" className="bg-white rounded-[25px] outline-none w-[300px] sm:w-[350px] md:w-[300px] lg:w-[350px] xl:w-[300px] 2xl:w-[350px] h-[64px] text-[#68686880] px-[24px] text-[18px]" placeholder="Name" />
                <input type="text" className="bg-white rounded-[25px] outline-none w-[300px] sm:w-[350px] md:w-[300px] lg:w-[350px] xl:w-[300px] 2xl:w-[350px] h-[64px] text-[#68686880] px-[24px] text-[18px]" placeholder="Company Name" />
                <input type="text" className="bg-white rounded-[25px] outline-none w-[300px] sm:w-[350px] md:w-[300px] lg:w-[350px] xl:w-[300px] 2xl:w-[350px] h-[64px] text-[#68686880] px-[24px] text-[18px]" placeholder="Password" />
              </div>

              <div className="max-w-[320px] sm:max-w-[380px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[320px] 2xl:max-w-[380px] flex flex-col justify-between items-start gap-[22px] sm:gap-[24px] md:gap-[22px] lg:gap-[24px] xl:gap-[22px] 2xl:gap-[24px]">
                <p className="text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px]">Connect Your Business</p>
                <p className="text-[#686868] font-manrope font-normal text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px] xl:text-[18px] 2xl:text-[20px] leading-[28px] sm:leading-[32px] md:leading-[28px] lg:leading-[32px] xl:leading-[28px] 2xl:leading-[32px]">Sign up and link your credit card processor or POS system with CASA.
                  We support all major payment provider</p>
                <div className="flex flex-col justify-between items-start gap-[8px]">
                  <p className="text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]"><span className="text-[12px] w-[20px] h-[20px]
                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3">✔️</span>Fast approval & easy integration</p>
                  <p className="text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]"><span className="text-[12px] w-[20px] h-[20px]
                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3">✔️</span>No impact on your credit score</p>
                </div>
              </div>

            </div>
            {/* card2 */}
            <div className="h-[718px] max-w-[350px] sm:max-w-[456px] md:max-w-[350px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px]
            flex flex-col justify-between items-center gap-[34px] sm:gap-[36px] md:gap-[34px] lg:gap-[36px] xl:gap-[34px] 2xl:gap-[36px] rounded-[25px]
              py-[32px] sm:py-[36px] md:py-[32px] lg:py-[36px] xl:py-[32px] 2xl:py-[36px] px-[26px] sm:px-[29px] md:px-[26px] lg:px-[29px] xl:px-[26px] 2xl:px-[29px] bg-white shadow-sm mx-auto">

              <div className="bg-[#F1F68E] flex flex-col justify-center gap-[20px] sm:gap-[24px] md:gap-[20px] lg:gap-[24px] xl:gap-[20px] 2xl:gap-[24px]
              py-[20px] sm:py-[24px] md:py-[20px] lg:py-[24px] xl:py-[20px] 2xl:py-[24px] px-[28px] sm:px-[32px] md:px-[28px] lg:px-[32px] xl:px-[28px] 2xl:px-[32px]
              rounded-[25px] max-w-[330px] sm:max-w-[396px] md:max-w-[330px] lg:max-w-[396px] xl:max-w-[330px] 2xl:max-w-[396px]">
                <div className="bg-white rounded-[25px] p-[8px] sm:p-[16px] md:p-[8px] lg:p-[16px] xl:p-[8px] 2xl:p-[16px] max-w-[300px] sm:max-w-[332px] md:max-w-[300px]
                lg:max-w-[332px] xl:max-w-[300px] 2xl:max-w-[332px] flex justify-between items-center gap-[4px] sm:gap-[8px] md:gap-[4px] lg:gap-[8px] xl:gap-[4px] 2xl:gap-[8px]">
                  <img src={man6} alt="" />
                  <div className="flex flex-col justify-between items-start gap-[8px]">
                    <p className="text-[#141414] font-roboto font-bold text-[18px] sm:text-[24px] md:text-[18px] lg:text-[24px] xl:text-[18px] 2xl:text-[24px]">Maria Kosta</p>
                    <p className="text-[#686868] font-roboto font-semibold text-[12px] sm:text-[14px] md:text-[12px] lg:text-[14px] xl:text-[12px] 2xl:text-[14px]">maria@gmail.com</p>
                  </div>
                  <p className="text-[#0F4E23] font-roboto font-bold text-[16px] sm:text-[24px] md:text-[16px] lg:text-[24px] xl:text-[16px] 2xl:text-[24px]">+$10k</p>
                </div>
                <div className="flex flex-col justify-between items-center gap-[18px] sm:gap-[20px] md:gap-[18px] lg:gap-[20px] xl:gap-[18px] 2xl:gap-[20px] py-[24px] px-[16px] max-w-[300px] sm:max-w-[332px] md:max-w-[300px] lg:max-w-[332px] xl:max-w-[300px] 2xl:max-w-[332px] bg-white rounded-[25px]">
                  <div className="flex justify-between items-center gap-[50px] sm:gap-[119px] md:gap-[50px] lg:gap-[119px] xl:gap-[50px] 2xl:gap-[119px] max-w-[300px]">
                    <div className="flex flex-col justify-between items-center gap-[16px]">
                      <p className="text-[#686868] font-roboto font-semibold text-[12px] sm:text-[14px] md:text-[12px] lg:text-[14px] xl:text-[12px] 2xl:text-[14px]">Total balance</p>
                      <p className="text-[#141414] font-roboto font-semibold text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px] xl:text-[18px] 2xl:text-[20px]">$12000.00</p>
                    </div>
                    <div className="flex flex-col justify-between items-center gap-[8px]">
                      <p className="inline-flex justify-center items-center w-[40px] sm:w-[48px] md:w-[40px] lg:w-[48px] xl:w-[40px] 2xl:w-[48px] h-[40px] sm:h-[48px] md:h-[40px] lg:h-[48px] xl:h-[40px] 2xl:h-[48px] rounded-full bg-[#F1F68E]">10%</p>
                      <p className="text-[#686868] font-roboto font-semibold text-[10px] sm:text-[14px] md:text-[10px] lg:text-[14px] xl:text-[10px] 2xl:text-[14px]">discount rate</p>
                    </div>
                  </div>
                  <div className="bg-[#DAFFC2] flex justify-between items-center rounded-[12px] p-[24px] gap-[80px] sm:gap-[140px] md:gap-[80px] lg:gap-[140px] xl:gap-[80px] 2xl:gap-[140px] max-w-[299px] max-h-[40px]">
                    <p className="text-[#141414] font-roboto font-semibold text-[14px]">See detail</p>
                    <p className="text-[#141414] font-roboto font-semibold text-[14px]">&gt; &gt;</p>
                  </div>
                </div>

              </div>


              <div className="max-w-[320px] sm:max-w-[380px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[320px] 2xl:max-w-[380px] flex flex-col justify-between items-start gap-[22px] sm:gap-[24px] md:gap-[22px] lg:gap-[24px] xl:gap-[22px] 2xl:gap-[24px]">
                <p className="text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px]">Connect Your Business</p>
                <p className="text-[#686868] font-manrope font-normal text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px] xl:text-[18px] 2xl:text-[20px] leading-[28px] sm:leading-[32px] md:leading-[28px] lg:leading-[32px] xl:leading-[28px] 2xl:leading-[32px]">Sign up and link your credit card processor or POS system with CASA.
                  We support all major payment provider</p>
                <div className="flex flex-col justify-between items-start gap-[8px]">
                  <p className="text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]"><span className="text-[12px] w-[20px] h-[20px]
                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3">✔️</span>Fast approval & easy integration</p>
                  <p className="text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]"><span className="text-[12px] w-[20px] h-[20px]
                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3">✔️</span>No impact on your credit score</p>
                </div>
              </div>
            </div>
            {/* card3 */}
            <div className="h-[718px] max-w-[350px] sm:max-w-[456px] md:max-w-[350px] lg:max-w-[456px] xl:max-w-[350px] 2xl:max-w-[456px]
            flex flex-col justify-between items-center gap-[34px] sm:gap-[36px] md:gap-[34px] lg:gap-[36px] xl:gap-[34px] 2xl:gap-[36px]
              rounded-[25px] py-[32px] sm:py-[36px] md:py-[32px] lg:py-[36px] xl:py-[32px] 2xl:py-[36px] px-[26px] sm:px-[29px] md:px-[26px] lg:px-[29px] xl:px-[26px] 2xl:px-[29px] bg-white shadow-sm mx-auto">

              <div className="bg-[#DAFFC2] p-[24px] flex flex-col justify-center items-center gap-[38px] sm:gap-[42px] md:gap-[38px] lg:gap-[42px] xl:gap-[38px] 2xl:gap-[42px] rounded-[25px]">
                <div className="flex justify-between items-start gap-[14px] p-[14px] sm:p-[24px] md:p-[14px] lg:p-[24px] xl:p-[14px] 2xl:p-[24px] rounded-[25px] bg-white max-w-[300px] sm:max-w-[349px] md:max-w-[300px] lg:max-w-[349px] xlmax-w-[300px] 2xl:max-w-[349px]">
                  <img src={card3} alt="" />
                  <div className="flex flex-col justify-between items-start gap-[8px]">
                    <p className="text-[#141414] font-roboto font-semibold text-[14px] sm:text-[18px] md:text-[14px] lg:text-[18px] xl:text-[14px] 2xl:text-[18px]">Receive Money from  card</p>
                    <p className="text-[#686868] font-manrope font-normal text-[11px] sm:text-[16px] md:text-[11px] lg:text-[16px] xl:text-[11px] 2xl:text-[16px]">Cash Deposited Within 24 Hours</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start gap-[16px] bg-white rounded-[25px] p-[20px] sm:p-[24px] md:p-[20px] lg:p-[24px] xl:p-[20px] 2xl:p-[24px]">
                  <div className="flex justify-between items-center gap-[70px] sm:gap-[100px] md:gap-[70px] lg:gap-[100px] xl:gap-[70px] 2xl:gap-[100px]">
                    <p className="text-[#141414] font-roboto font-bold text-[16px] sm:text-[24px] md:text-[16px] lg:text-[24px] xl:text-[16px] 2xl:text-[24px]">Recent User</p>
                    <p className="text-[#686868] font-roboto font-bold text-[12px] sm:text-[14px] md:text-[12px] lg:text-[14px] xl:text-[12px] 2xl:text-[14px]">View All</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <img src={man2} alt="" className="relative" />
                    <img src={man5} alt="" className="relative right-[12px]" />
                    <img src={man1} alt="" className="relative right-[24px]" />
                    <img src={man3} alt="" className="relative right-[36px]" />
                    <img src={man4} alt="" className="relative right-[48px]" />
                    <img src={nine} alt="" className="relative right-[60px]" />
                  </div>
                </div>

              </div>


              <div className="max-w-[320px] sm:max-w-[380px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[320px] 2xl:max-w-[380px] flex flex-col justify-between items-start gap-[22px] sm:gap-[24px] md:gap-[22px] lg:gap-[24px] xl:gap-[22px] 2xl:gap-[24px]">
                <p className="text-[#141414] font-roboto font-bold text-[22px] sm:text-[24px] md:text-[22px] lg:text-[24px] xl:text-[22px] 2xl:text-[24px]">Connect Your Business</p>
                <p className="text-[#686868] font-manrope font-normal text-[18px] sm:text-[20px] md:text-[18px] lg:text-[20px] xl:text-[18px] 2xl:text-[20px] leading-[28px] sm:leading-[32px] md:leading-[28px] lg:leading-[32px] xl:leading-[28px] 2xl:leading-[32px]">Sign up and link your credit card processor or POS system with CASA.
                  We support all major payment provider</p>
                <div className="flex flex-col justify-between items-start gap-[8px]">
                  <p className="text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]"><span className="text-[12px] w-[20px] h-[20px]
                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3">✔️</span>Fast approval & easy integration</p>
                  <p className="text-[#686868] font-roboto font-semibold text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] xl:text-[16px] 2xl:text-[18px]"><span className="text-[12px] w-[20px] h-[20px]
                  inline-flex justify-center items-center rounded-full bg-[#DAFFC2] mr-3">✔️</span>No impact on your credit score</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* why casa different */}

      <div className="container container-pad">
        <div className="max-w-[350px] sm:max-w-[460px] md:max-w-[610px] lg:max-w-[720px] xl:max-w-[822px] flex flex-col justify-between
          items-center gap-[26px] sm:gap-[28px] md:gap-[30px] lg:gap-[32px] mx-auto mt-[160px] mb-[130px]">
            <p className="bg-[#DFEDE3] rounded-[999px] py-[6px] px-[22px] lg:py-[8px] lg:px-[24px] max-w-[227px] font-manrope
            font-semibold text-[15px] sm:text-[17px] lg:text-[18px] xl:text-[20px] text-[#0F4E23]">Why casa different</p>
            <h3 className="font-roboto font-extrabold text-[32px] sm:text-[37px] md:text-[48px] lg:text-[54px] xl:text-[56px] leading-[54px]
             sm:leading-[60px] md:leading-[64px] lg:leading-[68px] text-[#141414] text-center max-w-[330px] sm:max-w-[550px] lg:max-w-[580px] xl:max-w-[612px]">Why CASA Stands Out from the Rest</h3>
            <p className="text-[#686868] font-manrope font-normal text-[14px] sm:text-[16px] md:text-[17px] lg:text-[20px] xl:text-[24px] leading-[28px]
             sm:leading-[30px] md:leading-[33px] lg:leading-[36px] text-center">Empowering businesses with faster cash access, CASA provides a secure, fast,
              and flexible solution to get early payments for credit card sales.</p>
          </div>

      </div>



    </div>
  );
};

export default Home;
