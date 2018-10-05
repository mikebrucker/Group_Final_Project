class GamesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_profile, only: [:show, :edit, :update, :destroy]
  
    # GET /profiles
    # GET /profiles.json
    def index
    end
  
    # GET /profiles/1/edit
    def blob_man
    end
    def ogre_crossing
    end
    def sky_high
    end
  
    # POST /profiles
    # POST /profiles.json
    
    # PATCH/PUT /profiles/1
    # PATCH/PUT /profiles/1.json
    def update
      respond_to do |format|
        if @profile.update(profile_params)
          format.html { redirect_to @profile, notice: 'Profile was successfully updated.' }
          format.json { render :show, status: :ok, location: @profile }
        else
          format.html { render :edit }
          format.json { render json: @profile.errors, status: :unprocessable_entity }
        end
      end
    end
  
    # DELETE /profiles/1
    # DELETE /profiles/1.json
   
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_profile
        @profile = Profile.find(params[:id])
      end
  
      # Never trust parameters from the scary internet, only allow the white list through.
      def profile_params
        params.require(:profile).permit(:user_id, :fname, :lname, :total_games_played, :blob_games_played, :blob_games_won, :blob_games_lost, :ogre_games_played, :ogre_games_won, :ogre_games_lost, :sky_games_played, :blob_game_high_score, :ogre_game_high_score, :sky_game_high_score, :avatar)
      end
  end
  