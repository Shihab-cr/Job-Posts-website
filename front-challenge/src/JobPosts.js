// JobPosts.jsx
import React, { useState, useEffect, useMemo } from "react";
import PostCard from "./PostCard";

    const findFirstArray = (obj) => {
        if (Array.isArray(obj)) return obj;
        if (obj && typeof obj === "object") {
        for (const key of Object.keys(obj)) {
            const found = findFirstArray(obj[key]);
            if (found) return found;
        }
        }
        return null;
    };


    const JobPosts = ({
    generalFilter = "",
    setGeneralFilter,
    countryFilter = "",
    setCountryFilter,
    isSearching, // currently unused but kept for API compatibility
    setIsSearching,
    isFiltered = false,
    }) => {
    const [rawData, setRawData] = useState(null); // the raw JSON from fetch
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  // helper: find first array anywhere inside an object

  // fetch once
    useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

        fetch("/db.json")
        .then((res) => {
            if (!res.ok) {
            throw new Error("Could not load data from db.json");
            }
            return res.json();
        })
        .then((json) => {
            if (cancelled) return;
            setRawData(json);
        })
        .catch((err) => {
            if (cancelled) return;
            setError(err.message || "Unknown error");
        })
        .finally(() => {
            if (!cancelled) setIsLoading(false);
        });

        return () => {
        cancelled = true;
        };
    }, []);

  // normalize rawData into an array of posts

    const posts = useMemo(() => {
        if (!rawData) return [];
        if (Array.isArray(rawData)) return rawData;

        // common wrappers
        if (Array.isArray(rawData.recepies)) return rawData.recepies;
        if (Array.isArray(rawData.data)) return rawData.data;
        if (Array.isArray(rawData.results)) return rawData.results;
        if (Array.isArray(rawData.items)) return rawData.items;

        // fallback: search deeper
        return findFirstArray(rawData) ?? [];
    }, [rawData]);

    // apply general & country search
    const searched = useMemo(() => {
        if (!posts.length) return [];

        const g = (generalFilter || "").trim().toLowerCase();
        const c = (countryFilter || "").trim().toLowerCase();

        let out = posts;

        if (g) {
        out = out.filter((post) => {
            const name = (post?.firmName || "").toString().toLowerCase();
            const brief = (post?.jobBreif || "").toString().toLowerCase();
            return name.includes(g) || brief.includes(g);
        });
        }

        if (c) {
        out = out.filter((post) => {
            const country = (post?.firmCountry || "").toString().toLowerCase();
            return country.includes(c);
        });
        }

        return out;
    }, [posts, generalFilter, countryFilter]);

     const hasSearch = (generalFilter || "").trim() !== "" || (countryFilter || "").trim() !== "";


    // final display list (also apply `isFiltered` which filters to full-time)
    const displayData = useMemo(() => {
        const base = hasSearch ? searched : posts;

    if (!Array.isArray(base) || !base.length) return [];

    if (isFiltered) {
      return base.filter(
        (p) => (p?.jobType || "").toString().trim().toLowerCase() === "full time"
      );
    }
    return base;
  }, [posts, searched, isFiltered, hasSearch]);

    return (
        <div className="JobPost-container">
        <PostCard data={displayData} isLoading={isLoading} error={error} />
        </div>
    );
};

export default JobPosts;
