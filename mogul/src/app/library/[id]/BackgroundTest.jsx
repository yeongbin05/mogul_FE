import LibraryIndividual from "./LibraryIndividual";

export async function getData() {
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  // const response = await fetch(
  //   process.env.NEXT_PUBLIC_API_KEY + `/user/profile/info`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${accessToken}`,
  //     },
  //   }
  // );

  // if (!response.ok) {
  // }

  // return response.json();
}

async function BackgroundTest({ libraryId }) {
  //backgroundTest에서 유저 프로필 정보를 가져와서 대조해서 사용해보자(될까?)
  const profile = await getData();
  // console.log(profile);
  return (
    <div>
      <div
        className="mx-auto mt-11 mb-10 border-black rounded-3xl "
        style={{ backgroundColor: "#DED0B6", maxWidth: "80%" }}
      >
        <div>
          <div className="text-center p-8">
            <LibraryIndividual libraryId={libraryId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackgroundTest;
