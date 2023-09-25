import Head from "next/Head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Image from "next/image";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCakeStores } from "../lib/cakes-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useEffect } from "react";

export async function getStaticProps(context) {
  console.log("HI from getStaticProps");
  const cakesStores = await fetchCakeStores();

  return {
    props: {
      coffeeStores: cakesStores,
    },
  };
}

export default function Home(props) {
  console.log("props", props);

  const { handleTrackLocation, latLong, locationErrosMsg, isFindingLocation } =
    useTrackLocation();
  console.log({ latLong, locationErrosMsg });

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 6);
          console.log({ fetchedCoffeeStores });
          //set coffee stores
        } catch (error) {
          //set error
          console.log("Error", { error });
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong]);
  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Cakes Connoisseur</title>
      </Head>

      <main className={styles.main}>
        <Banner
         buttonText={isFindingLocation ? "Locating..." : "View Stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrosMsg && <p>Something went wrong: {locationErrosMsg}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/back2.gif" width={400} height={300} />
        </div>
        <div className={styles.sectionWrapper}>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}> Damascus stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://i1.fnp.com/images/pr/l/v20181026212033/pineapple-cake-half-kg_1.jpg"
                    }
                    href={`/cake-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
     </main>
    </div>
  );
}
