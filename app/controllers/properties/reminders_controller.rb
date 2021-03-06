module Properties
  class RemindersController < ApplicationAuthController
    before_action :set_reminder, only: [:show, :update, :destroy]
    before_action :set_property

    def index
      @reminders = policy_scope(Reminder)
      render json: @reminders
    end

    # /emit emits reminders starting from start month to end month. s=032019 e=032019
    def emit
      authorize @property
      render json: @reminders
    end

    def show
      authorize @reminder
      render json: @reminder
    end

    def create
      @reminder = Reminder.new(reminder_params)
      authorize @reminder

      if @reminder.save
        render json: @reminder, status: :created, location: @reminder
      else
        render json: @reminder.errors, status: :unprocessable_entity
      end
    end

    def update
      authorize @reminder
      if @reminder.update(reminder_params)
        render json: @reminder, status: :created, location: @reminder
      else
        render json: @reminder.errors, status: :unprocessable_entity
      end
    end

    def destroy
      authorize @reminder
      @reminder.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_reminder
        @reminder = Reminder.find(params[:id])
      end
      def set_property
        @property = Property.find(params[:property_id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def reminder_params
        params.require(:reminder).permit(:property, :reminder_type, :start, :end, :all_day)
      end

  end
end
