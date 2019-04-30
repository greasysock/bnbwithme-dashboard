class AddOwnerToProperty < ActiveRecord::Migration[5.2]
  def change
    add_reference :properties, :owner
  end
end
