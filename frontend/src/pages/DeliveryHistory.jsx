/*
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryHistoryCard from "../components/DeliveryHistoryCard";

function DeliveryHistory() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDeliveryHistory = async () => {

    try {

      const response = await axios.get(
        `${serverUrl}/api/order/get-delivery-history`,
        {
          withCredentials: true
        }
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    getDeliveryHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Delivery History...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">

      <h1 className="text-3xl font-bold mb-6">
        Delivery History
      </h1>

      {
        history.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            No deliveries completed yet
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {
              history.map((delivery) => (
                <DeliveryHistoryCard
                  key={delivery.orderId + delivery.createdAt}
                  delivery={delivery}
                />
              ))
            }
          </div>
        )
      }

    </div>
  );
}

export default DeliveryHistory;
*/

/*
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryHistoryCard from "../components/DeliveryHistoryCard";


function DeliveryHistory() {

  const [history, setHistory] = useState([]);

  const getHistory = async () => {

    try {

      const response = await axios.get(
        `${serverUrl}/api/order/get-delivery-history`,
        {
          withCredentials: true
        }
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f5f2] pt-28 pb-10">

      <div className="max-w-4xl mx-auto px-4">

    
        <div className="mb-6">

          <h1 className="text-4xl font-bold text-[#2d3748]">
            My Deliveries
          </h1>

          <p className="text-gray-500 mt-1">
            View all completed deliveries
          </p>

        </div>

     
        <div className="flex flex-col gap-5">

          {
            history.map((delivery, index) => (
              <DeliveryHistoryCard
                key={index}
                delivery={delivery}
              />
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default DeliveryHistory;
*/


import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryHistoryCard from "../components/DeliveryHistoryCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function DeliveryHistory() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getHistory = async () => {

    try {

      const response = await axios.get(
        `${serverUrl}/api/order/get-delivery-history`,
        {
          withCredentials: true
        }
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  if (loading) {

    return (
      <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-[#ff4d2d] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-lg font-semibold text-gray-700">
            Loading Deliveries...
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#fff9f6] pt-24 pb-10">

      <div className="max-w-4xl mx-auto px-4">

        {/* HEADER */}
        <div className='flex items-center gap-4 mb-6'>

          <IoIosArrowRoundBack
            size={40}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate(-1)}
          />

          <div>

            <h1 className="text-xl md:text-3xl font-bold text-[#2d3748]">
              My Deliveries
            </h1>

            <p className="text-gray-500 mt-1 text-sm md:text-base">
              View all completed deliveries
            </p>

          </div>

        </div>

        {/* EMPTY STATE */}
        {
          history.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-md p-10 text-center border border-gray-100">

              <div className="text-5xl mb-4">
                📦
              </div>

              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                No Deliveries Yet
              </h2>

              <p className="text-gray-500">
                Completed deliveries will appear here
              </p>

            </div>

          ) : (

            <>
              
              {/* STATS */}
              <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-6 mb-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-gray-500 text-sm">
                      Total Deliveries
                    </p>

                    <h2 className="text-3xl font-bold text-[#2d3748] mt-1">
                      {history.length}
                    </h2>

                  </div>

                  <div className="text-right">

                    <p className="text-gray-500 text-sm">
                      Total Earnings
                    </p>

                    <h2 className="text-3xl font-bold text-green-600 mt-1">
                      ₹ {history.length * 50}
                    </h2>

                  </div>

                </div>

              </div>

              {/* DELIVERY LIST */}
              <div className="flex flex-col gap-5">

                {
                  history.map((delivery, index) => (

                    <DeliveryHistoryCard
                      key={index}
                      delivery={delivery}
                    />

                  ))
                }

              </div>

            </>

          )
        }

      </div>

    </div>
  );
}

export default DeliveryHistory;