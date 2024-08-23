import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface HomeState {
  pokemon: Pokemon[];
  pokemonById: PokemonDetail;
  welcomeText: string;
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

export interface Pokemon {
  name: string;
}

export interface PokemonResponse {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
}

export interface Pagination {
  limit: number;
  page: number;
}

export interface PokemonDetail {
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

const initialState: HomeState = {
  pokemon: [],
  pokemonById: {
    stats: [],
    types: [],
  },
  welcomeText: "",
  loading: "idle",
  error: "",
};

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemon = createAsyncThunk<Pokemon[], Pagination>(
  "home/fetchPokemon",
  async (params: Pagination) => {
    const response = await axios.get<PokemonResponse>(BASE_URL, {
      params: {
        limit: params.limit,
        offset: params.page * params.limit,
      },
    });

    return response.data.results;
  }
);

export const fetchPokemonById = createAsyncThunk<PokemonDetail, string>(
  "home/fetchPokemonById",
  async (id: string) => {
    const response = await axios.get<PokemonDetail>(`${BASE_URL}/${id}`);
    const data = {
      stats: response.data.stats,
      types: response.data.types,
    };

    return data;
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    welcomeToHomePage: (state, action: PayloadAction<string>) => {
      state.welcomeText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.pending, (state, action) => {
      state.loading = action.payload;
    });
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      state.pokemon = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchPokemon.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "";
    });
    builder.addCase(fetchPokemonById.pending, (state, action) => {
      state.loading = action.payload;
    });
    builder.addCase(fetchPokemonById.fulfilled, (state, action) => {
      state.pokemonById = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchPokemonById.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "";
    });
  },
});

export const { welcomeToHomePage } = homeSlice.actions;
export default homeSlice.reducer;
