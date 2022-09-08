/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { SubscribeButton } from "../componentes/SubscribeButton";
import styles from "./home.module.scss";
import { GetStaticProps } from "next";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}
export const getServerSideProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1LfcfjGNpLGtWB8tAMQu5OC1", {
    expand: ["product"],
  }); //id do preço no stripe ,expand dados do produto

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100), //trabalhar com preços em centavos + fácil de lidar
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 horas
  };
};
