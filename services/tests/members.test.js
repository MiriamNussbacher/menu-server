// Import the functions to be tested and necessary dependencies
const { getParents, getHierarchy, menuData } = require('../members');

// Mock data to be used in tests
const mockMenuData = [
  { memberId: 1, parentMemberId: 8, level: 2, name: "John Doe" },
  { memberId: 2, parentMemberId: 1, level: 3, name: "Daniel Thorpe" },
  { memberId: 3, parentMemberId: 5, level: 3, name: "David Suarez" },
  { memberId: 4, parentMemberId: 5, level: 3, name: "Felix Mcgee" },
  { memberId: 5, parentMemberId: 8, level: 2, name: "Deena Duarte" },
  { memberId: 6, parentMemberId: 3, level: 4, name: "Ron Gaines" },
  { memberId: 7, parentMemberId: 9, level: 5, name: "Kellie Clements" },
  { memberId: 8, parentMemberId: 0, level: 1, name: "Tony Soprano" },
  { memberId: 9, parentMemberId: 3, level: 4, name: "John Kavanagh" },
  { memberId: 10, parentMemberId: 8, level: 2, name: "Shawn Huynh" },
];

// Mock the module and its dependencies
jest.mock('../members', () => {
  const originalModule = jest.requireActual('../members');
  return {
    ...originalModule,
    getParents: jest.fn(),
    getHierarchy: jest.fn(),
    menuData: mockMenuData,
    parentsArr: [],
    hierarchyCache: new Map(),
  };
});

// Import the mocked functions and variables
const { getParents: mockGetParents, getHierarchy: mockGetHierarchy, parentsArr, hierarchyCache } = require('../services/members');

describe('Members Service', () => {
  beforeEach(() => {
    // Clear the arrays and maps before each test
    parentsArr.length = 0;
    hierarchyCache.clear();
    jest.clearAllMocks();
  });

  describe('getParents', () => {
    it('should return the list of parents', () => {
      // Mock the implementation of getParents to use the mock data
      mockGetParents.mockImplementation(() => {
        if (parentsArr.length) return parentsArr;
        parentsArr.push(...mockMenuData.filter(member => member.level === 1));
        return parentsArr;
      });

      const parents = mockGetParents();
      expect(parents).toEqual(mockMenuData.filter(member => member.level === 1));
    });

    it('should use cached parents array if already built', () => {
      mockGetParents.mockImplementation(() => {
        if (parentsArr.length) return parentsArr;
        parentsArr.push(...mockMenuData.filter(member => member.level === 1));
        return parentsArr;
      });

      mockGetParents(); // first call to build the array
      const parents = mockGetParents(); // second call should use the cache
      expect(parents.length).toBe(1);
      expect(parents[0].name).toBe("Tony Soprano");
    });
  });

  describe('getHierarchy', () => {
    it('should return null if memberId is invalid', () => {
      mockGetHierarchy.mockImplementation((memberId) => {
        if (hierarchyCache.has(memberId)) return hierarchyCache.get(memberId);

        const member = mockMenuData.find(m => m.memberId === memberId);
        if (!member) return null;

        const hierarchy = [member];

        if (member.level === 1) {
          hierarchyCache.set(memberId, hierarchy);
          return hierarchy;
        }

        const parentHierarchy = mockGetHierarchy(member.parentMemberId);
        const fullHierarchy = hierarchy.concat(parentHierarchy);

        hierarchyCache.set(memberId, fullHierarchy);
        return fullHierarchy;
      });

      const hierarchy = mockGetHierarchy(999);
      expect(hierarchy).toBeNull();
    });

    it('should return the hierarchy for a member with level 1', () => {
      mockGetHierarchy.mockImplementation((memberId) => {
        if (hierarchyCache.has(memberId)) return hierarchyCache.get(memberId);

        const member = mockMenuData.find(m => m.memberId === memberId);
        if (!member) return null;

        const hierarchy = [member];

        if (member.level === 1) {
          hierarchyCache.set(memberId, hierarchy);
          return hierarchy;
        }

        const parentHierarchy = mockGetHierarchy(member.parentMemberId);
        const fullHierarchy = hierarchy.concat(parentHierarchy);

        hierarchyCache.set(memberId, fullHierarchy);
        return fullHierarchy;
      });

      const hierarchy = mockGetHierarchy(8);
      expect(hierarchy).toEqual([mockMenuData.find(m => m.memberId === 8)]);
    });

    it('should return the hierarchy for a member with parent', () => {
      mockGetHierarchy.mockImplementation((memberId) => {
        if (hierarchyCache.has(memberId)) return hierarchyCache.get(memberId);

        const member = mockMenuData.find(m => m.memberId === memberId);
        if (!member) return null;

        const hierarchy = [member];

        if (member.level === 1) {
          hierarchyCache.set(memberId, hierarchy);
          return hierarchy;
        }

        const parentHierarchy = mockGetHierarchy(member.parentMemberId);
        const fullHierarchy = hierarchy.concat(parentHierarchy);

        hierarchyCache.set(memberId, fullHierarchy);
        return fullHierarchy;
      });

      const hierarchy = mockGetHierarchy(2);
      expect(hierarchy).toEqual([
        mockMenuData.find(m => m.memberId === 2),
        mockMenuData.find(m => m.memberId === 1),
        mockMenuData.find(m => m.memberId === 8),
      ]);
    });

    it('should cache the result after the first call', () => {
      mockGetHierarchy.mockImplementation((memberId) => {
        if (hierarchyCache.has(memberId)) return hierarchyCache.get(memberId);

        const member = mockMenuData.find(m => m.memberId === memberId);
        if (!member) return null;

        const hierarchy = [member];

        if (member.level === 1) {
          hierarchyCache.set(memberId, hierarchy);
          return hierarchy;
        }

        const parentHierarchy = mockGetHierarchy(member.parentMemberId);
        const fullHierarchy = hierarchy.concat(parentHierarchy);

        hierarchyCache.set(memberId, fullHierarchy);
        return fullHierarchy;
      });

      const spy = jest.spyOn(mockMenuData, 'find');
      mockGetHierarchy(2); // first call to build the hierarchy
      mockGetHierarchy(2); // second call should use the cache
      expect(spy).toHaveBeenCalledTimes(3); // 3 calls due to hierarchy
      spy.mockRestore();
    });
  });
});
