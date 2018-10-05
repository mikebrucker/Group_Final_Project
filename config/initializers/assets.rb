# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )

Rails.application.config.assets.precompile += %w( dist/phaser.js )
Rails.application.config.assets.precompile += %w( dist/phaser2.min.js )
Rails.application.config.assets.precompile += %w( blob_game/blob_game.js )
Rails.application.config.assets.precompile += %w( ogre_game/ogre_game.js )
Rails.application.config.assets.precompile += %w( sky_game/sky_game.js )
Rails.application.config.assets.precompile += %w( sky_game/stateInstructions.js )
Rails.application.config.assets.precompile += %w( sky_game/stateMain.js )
Rails.application.config.assets.precompile += %w( sky_game/stateOver.js )
Rails.application.config.assets.precompile += %w( sky_game/stateTitle.js )
