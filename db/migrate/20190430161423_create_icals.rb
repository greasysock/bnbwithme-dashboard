class CreateIcals < ActiveRecord::Migration[5.2]
  def change
    create_table :icals do |t|
      t.integer :service
      t.text :link
      t.references :property
      t.references :cleaner
      t.timestamps
    end
  end
end
