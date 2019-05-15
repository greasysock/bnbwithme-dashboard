class ChangeEncryptedPasswordToPasswordDigest < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :encrypted_password, :password_digest
  end
end
