module DefaultPageContent
    extend ActiveSupport::Concern

    included do
        before_action :set_page_title
    end

    def set_page_subtitle subtitle
        @page_title = "#{subtitle} | bnbwithme"
    end

    def set_page_title
        @page_subtitle = "Home"
        @page_title = set_page_subtitle @page_subtitle
    end
end