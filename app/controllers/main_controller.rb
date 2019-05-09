class MainController < ApplicationAuthController
  def index
  end

  def calendar
    set_page_subtitle("Calendar")
  end
end
