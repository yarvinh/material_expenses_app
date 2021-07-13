class ReceiptSerializer

    def initialize(user_object)
       @receipt = user_object
    end
  def to_serialized_json
      options = {
        include: {
           location:{
            only:[:id, :address]
          }
        },
        except: [:updated_at, :created_at]
      }
      @receipt.to_json(options)
    end
  
  end