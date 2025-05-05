import { fetchFromTMDB } from "../services/tmdb.service.js";
import { ENV_VARS } from "../config/envVars.js";

export async function getTrendingMovie(req,res){
    
    try{
        

        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
      


        // from the data returned we will fetch one movie randomly from list of movies
        const randomMovie=data.results[Math.floor(Math.random()*data.results?.length)];

        res.json({success:true,content:randomMovie})

    }
    catch(error){
        
        res.status(500).json({success:false,message:"Internal server error"})

    }
}

export async function getMovieTrailers(req,res){
   
    const {id}=req.params;
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);

        // some movies will have two trailers
        res.json({success:true,trailers:data.results});


    }
    catch(error){
       
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});

    }

}

export async function getMovieDetails(req,res){
   
    const {id}=req.params
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        
        res.status(200).json({success:true,content:data});

    }
    catch(error){
        
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});


    }
}

export async function getSimilarMovies(req,res){
    const {id}=req.params
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true,similar:data.results})


    }
    catch(error){
        // we are not going to hit 404 as there will be similar movies
        res.status(500).json({success:false,message:"Internal server error"});

    }
}

export async function getMoviesByCategory(req,res){
    const {category}=req.params;
   
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    }
    catch(error){
        res.status(500).json({success:true,message:"Internal server error"});

    }
}