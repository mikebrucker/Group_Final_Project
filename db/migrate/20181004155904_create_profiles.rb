class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.references :user, foreign_key: true
      t.string :fname
      t.string :lname
      t.integer :total_games_played
      t.integer :blob_games_played
      t.integer :blob_games_won
      t.integer :blob_games_lost
      t.integer :blob_game_high_score
      t.integer :ogre_games_played
      t.integer :ogre_games_won
      t.integer :ogre_games_lost
      t.integer :ogre_game_high_score
      t.integer :sky_games_played
      t.integer :sky_game_high_score

      t.timestamps
    end
  end
end
