class ReminderTypesController < ApplicationAuthController
    before_action :set_reminder_type, only: [:show, :update, :destroy]

    def index
      @reminder_types = policy_scope(ReminderType)
      render json: @reminder_types
    end

    def show
      authorize @reminder_type
      render json: @reminder_type
    end

    def search
      search_params = params['q'].to_s.downcase
      @reminder_types = ReminderType.where('lower(name) LIKE ?', "%#{search_params}%").limit(10)
      render json: @reminder_types
    end

    def create
      @reminder_type = ReminderType.new(reminder_type_params)
      authorize @reminder_type

      if @reminder_type.save
        render json: @reminder_type, status: :created, location: @reminder_type
      else
        render json: @reminder_type.errors, status: :unprocessable_entity
      end
    end

    def update
      authorize @reminder_type
      if @reminder_type.update(reminder_type_params)
        render json: @reminder_type, status: :created, location: @reminder_type
      else
        render json: @reminder_type.errors, status: :unprocessable_entity
      end
    end

    def destroy
      authorize @reminder_type
      @reminder_type.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_reminder_type
        @reminder_type = ReminderType.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def reminder_type_params
        params.require(:reminder_type).permit(:name, :symbol, reminders_attributes: [:property_id, :start, :end, :indefinite, :full_day, recurrences_attributes: [:day_of_week, :week_of_month, :month_of_year, :recurrence_type, :separation_count]])
      end

end
