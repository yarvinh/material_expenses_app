class ItemSerializer
    def initialize(user_object)
       @item = user_object
    end
  def to_serialized_json
      options = {
        include: {
           receipt:{
            only:[:id, :project_name]
          }
        },
        except: [:updated_at, :created_at]
      }
      @item.to_json(options)
    end
  
  end