class AddJwtToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :last_sign_in_ip, :string
    add_column :users, :last_sign_in_at, :datetime
    add_column :users, :invitation_token, :string
    add_column :users, :invitation_sent_at, :datetime
    add_column :users, :invitation_accepted_at, :datetime
    add_column :users, :invitation_created_at, :datetime
  end
end
