export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cricclubs_batting_stats: {
        Row: {
          average: number | null
          balls: number | null
          created_at: string
          fifties: number | null
          fours: number | null
          highest_score: string | null
          hundreds: number | null
          id: string
          innings: number | null
          matches: number | null
          not_outs: number | null
          player_id: string
          runs: number | null
          sixes: number | null
          strike_rate: number | null
          updated_at: string
        }
        Insert: {
          average?: number | null
          balls?: number | null
          created_at?: string
          fifties?: number | null
          fours?: number | null
          highest_score?: string | null
          hundreds?: number | null
          id?: string
          innings?: number | null
          matches?: number | null
          not_outs?: number | null
          player_id: string
          runs?: number | null
          sixes?: number | null
          strike_rate?: number | null
          updated_at?: string
        }
        Update: {
          average?: number | null
          balls?: number | null
          created_at?: string
          fifties?: number | null
          fours?: number | null
          highest_score?: string | null
          hundreds?: number | null
          id?: string
          innings?: number | null
          matches?: number | null
          not_outs?: number | null
          player_id?: string
          runs?: number | null
          sixes?: number | null
          strike_rate?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cricclubs_batting_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "cricclubs_players"
            referencedColumns: ["player_id"]
          },
        ]
      }
      cricclubs_bowling_stats: {
        Row: {
          average: number | null
          best_figures: string | null
          created_at: string
          economy: number | null
          five_wickets: number | null
          id: string
          innings: number | null
          maidens: number | null
          matches: number | null
          overs: number | null
          player_id: string
          runs_conceded: number | null
          strike_rate: number | null
          updated_at: string
          wickets: number | null
        }
        Insert: {
          average?: number | null
          best_figures?: string | null
          created_at?: string
          economy?: number | null
          five_wickets?: number | null
          id?: string
          innings?: number | null
          maidens?: number | null
          matches?: number | null
          overs?: number | null
          player_id: string
          runs_conceded?: number | null
          strike_rate?: number | null
          updated_at?: string
          wickets?: number | null
        }
        Update: {
          average?: number | null
          best_figures?: string | null
          created_at?: string
          economy?: number | null
          five_wickets?: number | null
          id?: string
          innings?: number | null
          maidens?: number | null
          matches?: number | null
          overs?: number | null
          player_id?: string
          runs_conceded?: number | null
          strike_rate?: number | null
          updated_at?: string
          wickets?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cricclubs_bowling_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "cricclubs_players"
            referencedColumns: ["player_id"]
          },
        ]
      }
      cricclubs_cache_meta: {
        Row: {
          cache_key: string
          error_message: string | null
          fetch_status: string | null
          id: string
          last_fetched_at: string
          ttl_hours: number | null
        }
        Insert: {
          cache_key: string
          error_message?: string | null
          fetch_status?: string | null
          id?: string
          last_fetched_at?: string
          ttl_hours?: number | null
        }
        Update: {
          cache_key?: string
          error_message?: string | null
          fetch_status?: string | null
          id?: string
          last_fetched_at?: string
          ttl_hours?: number | null
        }
        Relationships: []
      }
      cricclubs_fielding_stats: {
        Row: {
          catches: number | null
          created_at: string
          id: string
          player_id: string
          run_outs: number | null
          stumpings: number | null
          updated_at: string
        }
        Insert: {
          catches?: number | null
          created_at?: string
          id?: string
          player_id: string
          run_outs?: number | null
          stumpings?: number | null
          updated_at?: string
        }
        Update: {
          catches?: number | null
          created_at?: string
          id?: string
          player_id?: string
          run_outs?: number | null
          stumpings?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cricclubs_fielding_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "cricclubs_players"
            referencedColumns: ["player_id"]
          },
        ]
      }
      cricclubs_players: {
        Row: {
          club_id: string
          created_at: string
          id: string
          is_captain: boolean | null
          is_vice_captain: boolean | null
          jersey_number: number | null
          name: string
          photo_url: string | null
          player_id: string
          profile_url: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          club_id: string
          created_at?: string
          id?: string
          is_captain?: boolean | null
          is_vice_captain?: boolean | null
          jersey_number?: number | null
          name: string
          photo_url?: string | null
          player_id: string
          profile_url?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          club_id?: string
          created_at?: string
          id?: string
          is_captain?: boolean | null
          is_vice_captain?: boolean | null
          jersey_number?: number | null
          name?: string
          photo_url?: string | null
          player_id?: string
          profile_url?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      cricclubs_team: {
        Row: {
          captain: string | null
          club_id: string
          created_at: string
          division: string | null
          id: string
          league_name: string | null
          logo_url: string | null
          name: string
          player_count: number | null
          team_id: string
          updated_at: string
          vice_captain: string | null
        }
        Insert: {
          captain?: string | null
          club_id: string
          created_at?: string
          division?: string | null
          id?: string
          league_name?: string | null
          logo_url?: string | null
          name: string
          player_count?: number | null
          team_id: string
          updated_at?: string
          vice_captain?: string | null
        }
        Update: {
          captain?: string | null
          club_id?: string
          created_at?: string
          division?: string | null
          id?: string
          league_name?: string | null
          logo_url?: string | null
          name?: string
          player_count?: number | null
          team_id?: string
          updated_at?: string
          vice_captain?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
