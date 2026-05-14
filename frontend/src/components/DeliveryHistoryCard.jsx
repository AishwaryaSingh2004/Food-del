/*
function DeliveryHistoryCard({ delivery }) {

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

    
      <div className="flex items-center justify-between mb-4">

        <div>
          <h2 className="text-xl font-bold">
            {delivery.shop?.name}
          </h2>

          <p className="text-sm text-gray-400">
            Order ID: {delivery.orderId}
          </p>
        </div>

        <div className="bg-green-600 text-white px-4 py-1 rounded-full text-sm">
          Delivered
        </div>
      </div>


      <div className="mb-4">

        <h3 className="font-semibold text-lg mb-1">
          Customer
        </h3>

        <p>{delivery.customer?.fullName}</p>

        <p className="text-gray-400 text-sm">
          {delivery.customer?.mobile}
        </p>

      </div>


      <div className="mb-4">

        <h3 className="font-semibold text-lg mb-1">
          Delivery Address
        </h3>

        <p className="text-gray-300">
          {delivery.deliveryAddress?.text}
        </p>

      </div>


      <div className="mb-4">

        <h3 className="font-semibold text-lg mb-2">
          Items
        </h3>

        <div className="flex flex-col gap-2">

          {
            delivery.items?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between bg-zinc-800 p-3 rounded-lg"
              >
                <div>
                  <p>{item.name}</p>

                  <p className="text-sm text-gray-400">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p>
                  ₹ {item.price * item.quantity}
                </p>
              </div>
            ))
          }

        </div>
      </div>


      <div className="flex items-center justify-between mt-5 border-t border-zinc-700 pt-4">

        <div>

          <p className="text-gray-400 text-sm">
            Delivered At
          </p>

          <p>
            {
              new Date(delivery.deliveredAt)
                .toLocaleString()
            }
          </p>

        </div>

        <div className="text-right">

          <p className="text-gray-400 text-sm">
            Earned
          </p>

          <p className="text-2xl font-bold text-green-400">
            ₹ {delivery.totalAmount}
          </p>

        </div>

      </div>

    </div>
  );
}

export default DeliveryHistoryCard;*/

function DeliveryHistoryCard({ delivery }) {

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

      {/* TOP */}
      <div className="flex justify-between items-start mb-4">

        <div>

          <h2 className="text-2xl font-bold text-[#2d3748]">
            {delivery.shop?.name}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Order ID: #{delivery.orderId?.slice(-6)}
          </p>

        </div>

        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          Delivered
        </div>

      </div>

      {/* CUSTOMER */}
      <div className="mb-4">

        <h3 className="font-semibold text-[#2d3748] mb-1">
          Customer
        </h3>

        <p className="text-gray-700">
          {delivery.customer?.fullName}
        </p>

        <p className="text-gray-500 text-sm">
          {delivery.customer?.mobile}
        </p>

      </div>

      {/* ADDRESS */}
      <div className="mb-4">

        <h3 className="font-semibold text-[#2d3748] mb-1">
          Delivery Address
        </h3>

        <p className="text-gray-700 text-sm">
          {delivery.deliveryAddress?.text}
        </p>

      </div>

      {/* ITEMS */}
      <div className="mb-5">

        <h3 className="font-semibold text-[#2d3748] mb-3">
          Items
        </h3>

        <div className="flex flex-col gap-2">

          {
            delivery.items?.map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center border border-gray-200 rounded-xl px-4 py-3"
              >

                <div>

                  <p className="font-medium text-[#2d3748]">
                    {item.name}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity}
                  </p>

                </div>

                <p className="font-semibold text-[#2d3748]">
                  ₹ {item.price * item.quantity}
                </p>

              </div>
            ))
          }

        </div>

      </div>

      {/* FOOTER */}
      <div className="border-t pt-4 flex justify-between items-end">

        <div>

          <p className="text-gray-500 text-sm">
            Delivered At
          </p>

          <p className="text-[#2d3748] font-medium text-sm">
            {
              new Date(delivery.deliveredAt)
                .toLocaleString()
            }
          </p>

        </div>

        <div className="text-right">

          <p className="text-gray-500 text-sm">
            Earned
          </p>

          <p className="text-2xl font-bold text-green-600">
            ₹ 50
          </p>

        </div>

      </div>

    </div>
  );
}

export default DeliveryHistoryCard;