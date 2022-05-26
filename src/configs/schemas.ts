/**
 *  @swagger
 *  components:
 *    schemas:
 *      MongoosePagination:
 *        type: object
 *        required:
 *          - totalDocs
 *          - limit
 *          - totalPages
 *          - page
 *          - pagingCounter
 *          - hasPrevPage
 *          - hasNextPage
 *          - prevPage
 *          - nextPage
 *        properties:
 *          totalDocs:
 *            type: number
 *            description: total documents count
 *            example: 0
 *          limit:
 *            type: number
 *            description: limit value
 *            example: 12
 *          totalPages:
 *            type: number
 *            description: total page count with current limit
 *            example: 1
 *          page:
 *            type: number
 *            description: current page number
 *            example: 1
 *          pagingCounter:
 *            type: number
 *            description: paging counter
 *            example: 1
 *          hasPrevPage:
 *            type: boolean
 *            description: whether previous page exists or not
 *            example: false
 *          hasNextPage:
 *            type: boolean
 *            description: whether next page exists or not
 *            example: false
 *          prevPage:
 *            oneOf:
 *              - type: number
 *              - type: "null"
 *            description: previous page number
 *            example: null
 *          nextPage:
 *            oneOf:
 *              - type: number
 *              - type: "null"
 *            description: next page number
 *            example: null
 */
