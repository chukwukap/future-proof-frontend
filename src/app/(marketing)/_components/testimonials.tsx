function Review() {
  return (
    <section className="flex md:flex-row flex-col-reverse justify-center items-center gap-14 my-[8rem] mx-auto w-[90%] md:w-full md:h-[28rem]">
      <div className="md:w-[40%] flex md:block flex-col gap-2 items-center">
        <h1 className=" font-manrope text-2xl md:text-4xl text-gray-400 leading-[2.2rem] md:leading-[3.2rem] md:mt-10 text-center md:text-left ">
          &apos;Coinswag is a solid choice for anyone looking to show off their
          crypto passion or searching for gifts for blockchain-minded friends.
          &apos;
        </h1>
      </div>
      <div className="h-full relative">
        <div className="absolute bg-gradient-to-b from-transparent from-60% via-black/10 to-black h-full w-full" />
        <div className="absolute bottom-4 left-4">
          <h2 className=" text-lg text-gray-400">Anioke Sebastian</h2>
          <p className="text-sm text-gray-600">CEO, Coinswag</p>
        </div>
        <img
          src="/images/nft-1.jpeg"
          alt=""
          className="w-[32rem] h-full  object-cover rounded-[1.5rem] object-top"
          style={{ objectPosition: "center 10%" }}
        />
      </div>
    </section>
  );
}
export default Review;
