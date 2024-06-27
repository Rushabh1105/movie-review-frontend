import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";

let baseURL = 'http://localhost:3000/api/movie/'

const initialState = {
    movies: [],
    mve: {},
    error: null,
    loading: false,

}

export const getAllMoviesThunk = createAsyncThunk('movies/getAll', async (args, thunkAPI) => {
    const response = await fetch(baseURL);
    const data = await response.json();

    if(data.data){
        return thunkAPI.fulfillWithValue(data);
    }else{
        return thunkAPI.rejectWithValue(data.error);
    }
});

export const getMovieThunk = createAsyncThunk('movies/get', async(args, thunkAPI) => {
    const response = await fetch(`${baseURL}?id=${args._id}`);
    const data = await response.json();

    if(data.data){
        return thunkAPI.fulfillWithValue(data);
    }else{
        return thunkAPI.rejectWithValue(data.error);
    }
});

export const updateWatchStatusThunk = createAsyncThunk('movies/watch', async(args, thunkAPI) => {
    await fetch(
        `${baseURL}update/${args._id}`,
        {
            method: 'PATCH',
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        }
    );

    const res = await fetch(baseURL);
    const data = await res.json();
    if(data.data){
        return thunkAPI.fulfillWithValue(data);
    }else{
        return thunkAPI.rejectWithValue(data.error);
    }
});

export const AddMovieThunk = createAsyncThunk('movies/add', async(args, thunkAPI) => {
    try {
        await fetch(
            `${baseURL}new`,
            {
                method: 'POST',
                body: JSON.stringify(args),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            }
        )

        return thunkAPI.fulfillWithValue('Done');
    } catch (error) {
        return thunkAPI.rejectWithValue('Something went wrong');
    }
});

export const deleteMovieThunk = createAsyncThunk('movies/delete', async(args, thunkAPI) => {
    try {
        await fetch(
            `${baseURL}delete/${args._id}`,
            {
                method: 'DELETE',
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            }
        );
        const res = await fetch(baseURL);
        const data = await res.json();

        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue('Something went wrong');
    }
})

export const addReviewThunk = createAsyncThunk('movies/ratings', async(args, thunkAPI) => {
    try {
        // console.log(args)
        await fetch(
            `${baseURL}review/${args._id}`,
            {
                method: 'PUT',
                body: JSON.stringify(args),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            }
        );
        const res = await fetch(`${baseURL}?id=${args._id}`);
        const data = await res.json();
        console.log(data)
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
});

export const updateMovieThunk = createAsyncThunk('movies/update', async(args, thunkAPI) => {
    try {
        console.log(args)
        const {_id, ...othrData} = args;
        console.log(othrData);
        await fetch(
            `${baseURL}update/${_id}`,
            {
                method: 'PUT',
                body: JSON.stringify(othrData),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            }
        )

        const response = await fetch(baseURL);
        const data = await response.json();
        console.log(data)
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const movieSlice = createSlice({
    name: 'movies',
    initialState: initialState,
    reducers: {
        setMovie: (state, action) => {
            state.mve = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMoviesThunk.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getAllMoviesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = [...action.payload.data];
        })
        .addCase(getAllMoviesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = [...action.payload.error];
        })
        .addCase(getMovieThunk.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getMovieThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.mve = action.payload.data;
        })
        .addCase(getMovieThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = [...action.payload.error];
        })
        .addCase(updateWatchStatusThunk.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(updateWatchStatusThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = [...action.payload.data];
        })
        .addCase(updateWatchStatusThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast('Something went wrong');
        })
        .addCase(AddMovieThunk.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(AddMovieThunk.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(AddMovieThunk.rejected, (state, action) => {
            state.loading = false;
            toast('Something went wrong');
        })
        .addCase(deleteMovieThunk.fulfilled, (state, action) => {
            state.movies = [...action.payload.data];
        })
        .addCase(addReviewThunk.fulfilled, (state, action) => {
            console.log(action.payload);
            state.mve = action.payload.data;
        })
        .addCase(addReviewThunk.rejected, (state, action) => {
            state.error = 'Something went wrong'
        })
        .addCase(updateMovieThunk.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(updateMovieThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = [...action.payload.data];
        })
        .addCase(updateMovieThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Something went wrong';
        })
    }
})

export const movieReducer = movieSlice.reducer;

export const movieActions = movieSlice.actions;

export const movieSelector = (state) => state.movieReducer;
