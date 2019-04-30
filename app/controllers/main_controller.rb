class MainController < ApplicationAuthController
  def dashboard
  end

  def calendar
    set_page_subtitle("Calendar")
  end
end
