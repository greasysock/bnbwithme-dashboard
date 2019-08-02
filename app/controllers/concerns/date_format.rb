module DateFormat
    extend ActiveSupport::Concern

    def decode_date d
        Date.strptime(d, '%d%m%Y')
    end
end