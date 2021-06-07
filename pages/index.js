import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [textInput, setInput] = useState("");
  const [output, setOutput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
    e.target.value === "" && setOutput("");
  };

  const submitInput = async () => {
    console.time("api timer");
    setLoading(true);
    await axios
      .post("/api/rewrite", {
        input: textInput,
      })
      .then((res) => {
        setOutput(res.data);
        setLoading(false);
      });
    console.timeEnd("api timer");
  };

  return (
    <div className="flex flex-col items-center h-auto">
      <Head>
        <title>RePhraser</title>
        <meta
          name="description"
          content="RePhraser - Rephrasing/Rewriting tool."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="sticky top-0  bg-white w-full shadow">
        <h1 className={`${styles.title} font-bold`}>
          <a>RePhraser</a>
        </h1>
      </main>
      <section className="flex flex-col items-center h-auto md:p-0 p-20 m-10 md:w-3/4 max-w-4xl rounded-lg shadow-lg bg-gray-100">
        <div className="flex flex-col items-center text-center h-auto md:w-3/4 max-w-lg p-5 m-4 ">
          <p className="font-bold text-2xl mb-2">Useful for Rewriting:</p>
          <ul className="list-disc text-sm ml-12">
            <li>Product Descriptions</li>
            <li>Copy A/B Testing</li>
            <li>Paraphrasing</li>
          </ul>
        </div>

        <div className="flex flex-col items-center h-3/4 md:w-3/4 max-w-lg">
          <textarea
            className="w-full h-80 border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-4"
            type="text"
            onChange={onChange}
            placeholder="Product Description, Block of Text, or Copy to be rewritten."
          ></textarea>
          <button
            className="bg-blue-400 text-white font-semibold m-4 px-4 rounded-lg shadow-lg hover:shadow-none hover:bg-blue-500 h-10"
            onClick={submitInput}
          >
            Paraphrase This
          </button>
          <div className="w-full p-10 border-t-2 border-gray-200">
            {loading === false ? (
              <></>
            ) : (
              <>
                <div className="w-full animate-bounce p-4 rounded-lg shadow-lg text-4xl text-white font-semibold text-center bg-blue-400">
                  <p className="">Loading...</p>
                </div>
              </>
            )}
            {output !== "" && (
              <>
                <p className="bg-blue-400 text-white font-semibold text-lg p-4 shadow-lg rounded-lg">
                  {output}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <a
          href="https://www.twitter.com/natespring_"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by
          <span className="text-xl font-bold animate-pulse text-blue-600 m-2">
            Nate Spring
          </span>
        </a>
      </footer>
    </div>
  );
}
