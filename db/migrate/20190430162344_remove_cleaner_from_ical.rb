class RemoveCleanerFromIcal < ActiveRecord::Migration[5.2]
  def change
    remove_column :icals, :cleaner_id, :big_int
  end
end
