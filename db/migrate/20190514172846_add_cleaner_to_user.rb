class AddCleanerToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :cleaner, :boolean
  end
end
