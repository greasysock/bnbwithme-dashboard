module PropertiesHelper
    def icalService ical
        return '<span class="icon-airbnb" style="color:green;"></span>'.html_safe if ical.airbnb?
        return '<span class="icon-vrbo" style="color:green;"></span>'.html_safe if ical.vrbo?
    end
end
