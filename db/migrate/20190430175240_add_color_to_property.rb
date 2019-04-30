class AddColorToProperty < ActiveRecord::Migration[5.2]
  def change
    add_column :properties, :color, :string
  end
end
