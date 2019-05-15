class AddAuthTokensToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :auth_tokens, :string
  end
end
