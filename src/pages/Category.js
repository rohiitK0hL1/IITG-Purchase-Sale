import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { db } from "./../firebase.config";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { url } from "./links";

const Category = () => {
  const [listing, setListing] = useState("");
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const scrollId = "";

  //fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
      //   //refrence
      //   const listingsRef = collection(db, `${params.categoryName}s`);
      //   //query
      //   const q = query(
      //     listingsRef,
      //     // where("type", "==", params.categoryName),
      //     orderBy("timestamp", "desc"),
      //     limit(5)
      //   );
      //   //execute query
      //   const querySnap = await getDocs(q);
      //   const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      //   setLastFetchListing(lastVisible);
      //   const listings = [];
      //   querySnap.forEach((doc) => {
      //     return listings.push({
      //       id: doc.id,
      //       productdiv: doc.data().productdiv,
      //       data: doc.data(),
      //     });
      //   });
        const listings = [];
        fetch(`${url}/get_docs_click`, {
          method: 'POST',
          body: JSON.stringify({
            category: params.categoryName
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          data['hits']['hits'].forEach((doc) => {
            console.log("pushing into listings");
            return listings.push({
              id: doc['_id'],
              productdiv: doc['_source']['productdiv'],
              data: doc['_source']
            })
          })
          console.log(listings);
          setListing(listings);
          console.log(listing)
          setLoading(false);
        })
      } catch (error) {
        console.log(error);
        toast.error("Unble to fetch data");
      }
    };
    //func call
    fetchListing();
  }, [params.categoryName]);

  //loadmore pagination func
  const fetchLoadMoreListing = async () => {
    try {
      //refrence
      const listingsRef = collection(db, `${params.categoryName}s`);
      //query
      const q = query(
        listingsRef,
        // where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(10)
      );
      //execute query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          productdiv: doc.data().productdiv,
          data: doc.data(),
        });
      });
      setListing((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Unble to fetch data");
    }
  };

  return (
    <Layout>
      <div className="mt-3 container-fluid">
        {loading ? (
          <Spinner />
        ) : listing && listing.length > 0 ? (
          <>
            <div>
              {listing.map((list) => (
                <ListingItem 
                key={listing.id}
                listing={list.data}
                productdiv = {list.productdiv}
                id={list.id}
                // onDelete={null}
                // onEdit={null}
                />
              ))}
            </div>
          </>
        ) : (
          <p>No Listing For {params.categoryName} </p>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-center mb-4 mt-4">
        {lastFetchListing && (
          <button
            className="btn btn-primary text-center"
            onClick={fetchLoadMoreListing}
          >
            load more
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Category;